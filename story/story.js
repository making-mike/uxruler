(function () {
  const pageType = document.body.dataset.storyPageType || "story";
  const caseId = document.body.dataset.caseId || "";
  const portfolioSurveyFallback = {
    id: "8f7f3e0d-1f6a-4a8d-8f7f-2b02d9a4a9d3",
    source: "static_story_form",
    questions: [
      {
        id: "f0190d42-9f59-4b9c-b8c2-6733b5a0a9cc",
        type: "rating",
        scale: 5,
        question: "How do you like it so far?"
      },
      {
        id: "b4f54579-8ae0-4f21-a026-c8e9e9eae387",
        type: "open_text",
        question: "What would make the portfolio clearer?"
      }
    ]
  };
  let activePortfolioSurvey = portfolioSurveyFallback;

  function createSvgElement(tagName) {
    return document.createElementNS("http://www.w3.org/2000/svg", tagName);
  }

  function createElement(tagName, className, text) {
    const element = document.createElement(tagName);
    if (className) {
      element.className = className;
    }
    if (text) {
      element.textContent = text;
    }
    return element;
  }

  function clearElement(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  const riveRuntimeUrl = "https://unpkg.com/@rive-app/webgl2@latest";
  let riveRuntimePromise = null;

  function loadRiveRuntime() {
    if (window.rive && window.rive.Rive) {
      return Promise.resolve(window.rive);
    }

    if (riveRuntimePromise) {
      return riveRuntimePromise;
    }

    riveRuntimePromise = new Promise((resolve, reject) => {
      const existingScript = document.querySelector("script[data-rive-runtime]");

      function resolveRuntime() {
        if (window.rive && window.rive.Rive) {
          resolve(window.rive);
        } else {
          reject(new Error("Rive runtime did not expose window.rive"));
        }
      }

      if (existingScript) {
        existingScript.addEventListener("load", resolveRuntime, { once: true });
        existingScript.addEventListener("error", reject, { once: true });
        return;
      }

      const script = document.createElement("script");
      script.src = riveRuntimeUrl;
      script.async = true;
      script.dataset.riveRuntime = "canvas";
      script.addEventListener("load", resolveRuntime, { once: true });
      script.addEventListener("error", reject, { once: true });
      document.head.appendChild(script);
    });

    return riveRuntimePromise;
  }

  function initRiveAnimations() {
    const hosts = Array.from(document.querySelectorAll("[data-rive-src]"))
      .filter((host) => !host.closest("[hidden]"));

    if (!hosts.length) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function parseRiveInputs(value) {
      if (!value) {
        return null;
      }

      try {
        return JSON.parse(value);
      } catch {
        return null;
      }
    }

    function coerceRiveInputValue(value) {
      if (value === "true") {
        return true;
      }

      if (value === "false") {
        return false;
      }

      const numberValue = Number(value);
      return Number.isFinite(numberValue) && String(value).trim() !== "" ? numberValue : value;
    }

    function parseRiveInputNames(value, fallback) {
      return String(value || fallback || "")
        .split(",")
        .map((name) => name.trim())
        .filter(Boolean);
    }

    function getStateMachineInputs(host, riveInstance, stateMachine) {
      if (!stateMachine || typeof riveInstance.stateMachineInputs !== "function") {
        return [];
      }

      try {
        const inputs = riveInstance.stateMachineInputs(stateMachine) || [];
        host.dataset.riveInputNames = inputs.map((input) => input.name).join(",");
        return inputs;
      } catch {
        host.dataset.riveInputNames = "unavailable";
        return [];
      }
    }

    function findRiveInput(inputs, names) {
      return names
        .map((name) => inputs.find((input) => input.name === name))
        .find(Boolean);
    }

    function setRiveBooleanInput(input, value) {
      if (!input) {
        return false;
      }

      try {
        input.value = value;
        return true;
      } catch {
        return false;
      }
    }

    function fireRiveTriggerInput(input) {
      if (!input || typeof input.fire !== "function") {
        return false;
      }

      try {
        input.fire();
        return true;
      } catch {
        return false;
      }
    }

    function callRiveGetter(target, propertyName) {
      if (!target) {
        return null;
      }

      try {
        const value = target[propertyName];
        return typeof value === "function" ? value.call(target) : value;
      } catch {
        return null;
      }
    }

    function getRiveViewModelInstance(host, riveInstance) {
      let instance = callRiveGetter(riveInstance, "viewModelInstance");

      if (instance) {
        describeViewModelInstance(host, instance);
        host.dataset.riveViewModelBound = "auto";
        return instance;
      }

      const viewModelName = host.dataset.riveViewModel;

      if (!viewModelName || typeof riveInstance.viewModelByName !== "function") {
        host.dataset.riveViewModelBound = "none";
        return null;
      }

      try {
        const viewModel = riveInstance.viewModelByName(viewModelName);
        instance = viewModel?.defaultInstance?.() || viewModel?.instance?.() || null;

        if (instance && typeof riveInstance.bindViewModelInstance === "function") {
          riveInstance.bindViewModelInstance(instance);
          describeViewModelInstance(host, instance);
          host.dataset.riveViewModelBound = viewModelName;
          return instance;
        }
      } catch {
        host.dataset.riveViewModelBound = "error";
        return null;
      }

      host.dataset.riveViewModelBound = "none";
      return null;
    }

    function describeViewModelInstance(host, instance) {
      const properties = callRiveGetter(instance, "properties");

      if (!Array.isArray(properties)) {
        return;
      }

      host.dataset.riveViewModelProperties = properties
        .map((property) => property.name || property.path || property.key || "")
        .filter(Boolean)
        .join(",");
    }

    function getViewModelProperty(instance, propertyType, names) {
      if (!instance) {
        return null;
      }

      const propertyNames = [
        propertyType,
        `${propertyType}Property`
      ];

      for (const name of names) {
        for (const propertyName of propertyNames) {
          const getter = instance[propertyName];

          if (typeof getter !== "function") {
            continue;
          }

          try {
            const property = getter.call(instance, name);

            if (property) {
              return { name, property };
            }
          } catch {
            // Keep trying compatible property names across Rive runtime versions.
          }
        }
      }

      return null;
    }

    function setViewModelBoolean(instance, names, value) {
      const entry = getViewModelProperty(instance, "boolean", names);

      if (!entry) {
        return null;
      }

      try {
        if (typeof entry.property.set === "function") {
          entry.property.set(value);
        } else {
          entry.property.value = value;
        }

        return entry.name;
      } catch {
        return null;
      }
    }

    function fireViewModelTrigger(instance, names) {
      const entry = getViewModelProperty(instance, "trigger", names);

      if (!entry) {
        return null;
      }

      try {
        if (typeof entry.property.trigger === "function") {
          entry.property.trigger();
        } else if (typeof entry.property.fire === "function") {
          entry.property.fire();
        } else if (typeof entry.property.set === "function") {
          entry.property.set(true);
        } else {
          entry.property.value = true;
        }

        return entry.name;
      } catch {
        return null;
      }
    }

    function setViewModelValue(instance, name, value) {
      if (typeof value === "boolean") {
        return Boolean(setViewModelBoolean(instance, [name], value));
      }

      const propertyType = typeof value === "number" ? "number" : "string";
      const entry = getViewModelProperty(instance, propertyType, [name])
        || getViewModelProperty(instance, "enum", [name])
        || getViewModelProperty(instance, "string", [name])
        || getViewModelProperty(instance, "number", [name]);

      if (!entry) {
        return false;
      }

      try {
        if (typeof entry.property.set === "function") {
          entry.property.set(value);
        } else {
          entry.property.value = value;
        }

        return true;
      } catch {
        return false;
      }
    }

    function applyViewModelValues(host, instance) {
      const values = parseRiveInputs(host.dataset.riveViewModelValues);

      if (!values || !instance) {
        return;
      }

      const appliedValues = [];

      Object.entries(values).forEach(([name, value]) => {
        if (setViewModelValue(instance, name, value)) {
          appliedValues.push(name);
        }
      });

      host.dataset.riveViewModelValuesApplied = appliedValues.length ? appliedValues.join(",") : "none";
    }

    function setupRiveHoverPlayback(host, riveInstance, stateMachine) {
      if (host.dataset.rivePlayOnHover !== "true" || reduceMotion.matches) {
        return;
      }

      const targetSelector = host.dataset.riveHoverTarget;
      const hoverTarget = targetSelector ? host.closest(targetSelector) : host;

      if (!hoverTarget) {
        return;
      }

      const inputs = getStateMachineInputs(host, riveInstance, stateMachine);
      const viewModelInstance = getRiveViewModelInstance(host, riveInstance);
      applyViewModelValues(host, viewModelInstance);
      const booleanInputNames = parseRiveInputNames(host.dataset.riveHoverBooleanInput, "isActive");
      const triggerInputNames = parseRiveInputNames(host.dataset.riveHoverTriggerInput, "Trigger 1");
      const booleanInput = findRiveInput(
        inputs,
        booleanInputNames
      );
      const triggerInput = findRiveInput(
        inputs,
        triggerInputNames
      );
      const pauseDelay = Number(host.dataset.rivePauseDelay || 0);
      let pauseTimer = null;
      let activeBooleanName = booleanInput ? booleanInput.name : "";
      let activeTriggerName = triggerInput ? triggerInput.name : "";

      const play = () => {
        window.clearTimeout(pauseTimer);
        host.classList.add("is-rive-hovered");
        host.dataset.riveHoverActive = "true";

        if (setRiveBooleanInput(booleanInput, true)) {
          activeBooleanName = booleanInput.name;
        } else {
          activeBooleanName = setViewModelBoolean(viewModelInstance, booleanInputNames, true) || "";
        }

        if (fireRiveTriggerInput(triggerInput)) {
          activeTriggerName = triggerInput.name;
        } else {
          activeTriggerName = fireViewModelTrigger(viewModelInstance, triggerInputNames) || "";
        }

        host.dataset.riveHoverInputNames = [
          activeBooleanName,
          activeTriggerName
        ].filter(Boolean).join(",");

        if (typeof riveInstance.play === "function") {
          riveInstance.play();
        }
      };

      const deactivate = () => {
        host.classList.remove("is-rive-hovered");
        host.dataset.riveHoverActive = "false";

        if (!setRiveBooleanInput(booleanInput, false)) {
          setViewModelBoolean(viewModelInstance, booleanInputNames, false);
        }

        if (host.dataset.riveResetOnLeave === "true" && typeof riveInstance.reset === "function") {
          riveInstance.reset();
        }

        if (typeof riveInstance.pause === "function") {
          if (pauseDelay > 0) {
            pauseTimer = window.setTimeout(() => {
              riveInstance.pause();
            }, pauseDelay);
          } else {
            riveInstance.pause();
          }
        }
      };

      ["pointerenter", "mouseenter", "pointerover", "focus", "focusin", "click"].forEach((eventName) => {
        hoverTarget.addEventListener(eventName, play);
      });
      ["pointerleave", "mouseleave", "blur", "focusout"].forEach((eventName) => {
        hoverTarget.addEventListener(eventName, deactivate);
      });
      host.dataset.riveHoverReady = "true";
      host.dataset.riveHoverInputNames = [
        activeBooleanName,
        activeTriggerName
      ].filter(Boolean).join(",");
      deactivate();
    }

    loadRiveRuntime()
      .then((rive) => {
        hosts.forEach((host) => {
          const canvas = host.querySelector("canvas");

          if (!canvas || host.dataset.riveReady === "true") {
            return;
          }

          const fit = rive.Fit[host.dataset.riveFit || "Cover"] || rive.Fit.Cover;
          const alignment = rive.Alignment[host.dataset.riveAlignment || "Center"] || rive.Alignment.Center;
          const autoplay = host.dataset.riveAutoplay === "false" ? false : !reduceMotion.matches;
          const options = {
            src: host.dataset.riveSrc,
            canvas,
            autoplay,
            useOffscreenRenderer: true,
            layout: new rive.Layout({ fit, alignment })
          };

          if (host.dataset.riveAutoBind === "true") {
            options.autoBind = true;
          }

          if (host.dataset.riveArtboard) {
            options.artboard = host.dataset.riveArtboard;
          }

          const stateMachine = host.dataset.riveStateMachine;
          if (stateMachine) {
            options.stateMachines = stateMachine;
          }
          const riveInputValues = parseRiveInputs(host.dataset.riveInputs);

          let riveInstance;
          riveInstance = new rive.Rive({
            ...options,
            onLoad: () => {
              const inputs = getStateMachineInputs(host, riveInstance, stateMachine);

              if (stateMachine && riveInputValues) {
                const appliedInputs = [];

                Object.entries(riveInputValues).forEach(([inputName, inputValue]) => {
                  const input = inputs.find((candidate) => candidate.name === inputName);

                  if (!input) {
                    return;
                  }

                  if (typeof input.fire === "function" && inputValue === "fire") {
                    input.fire();
                  } else {
                    input.value = coerceRiveInputValue(inputValue);
                  }

                  appliedInputs.push(inputName);
                });

                host.dataset.riveInputsApplied = appliedInputs.length ? appliedInputs.join(",") : "none";
              }

              host.dataset.riveReady = "true";
              host.classList.add("is-rive-loaded");
              riveInstance.resizeDrawingSurfaceToCanvas();
              setupRiveHoverPlayback(host, riveInstance, stateMachine);
            },
            onLoadError: () => {
              host.dataset.riveError = "load";
            }
          });

          if ("ResizeObserver" in window) {
            const resizeObserver = new ResizeObserver(() => {
              riveInstance.resizeDrawingSurfaceToCanvas();
            });
            resizeObserver.observe(host);
            host.riveResizeObserver = resizeObserver;
          }

          host.riveInstance = riveInstance;
        });
      })
      .catch(() => {
        hosts.forEach((host) => {
          host.dataset.riveError = "runtime";
        });
      });
  }

  function slugify(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "item";
  }

  const lendiNodeItemDetails = {
    "lead-sources": {
      "Comparison website": "Lets clients compare mortgage paths before speaking with an expert, turning anonymous demand into a qualified lead.",
      "Calculators": "Captures affordability, installment, and timing signals while the client is still shaping the decision.",
      "Widgets": "Places Lendi entry points inside partner contexts so intent can start outside the main product.",
      "3rd party integrations": "Carries source, consent, and context between outside systems and the advisory workflow.",
      "Blog & tutorials": "Answers early questions and creates a lower-pressure route from education to advice.",
      "Experts ranking": "Uses expert visibility and trust signals to help clients choose who should guide them.",
      "B2B partners": "Turns partner demand into attributed, serviceable leads with a clear handoff path."
    },
    "call-center": {
      "Support": "Keeps early contact, routing, and status questions from becoming dead ends for clients.",
      "Assistance": "Helps move prospects from raw interest into a prepared meeting or next action."
    },
    "meeting": {
      "Online": "Supports remote advice when speed, geography, or schedule matters more than branch presence.",
      "In branch": "Keeps the human, local advisory path available for clients who need in-person trust."
    },
    "customer-app": {
      "Property search": "Connects the mortgage conversation to the property context the client is actually exploring.",
      "Notifications": "Keeps clients aware of next steps, missing input, and status changes without extra calls.",
      "Data management": "Gives the process one reliable place for client information, documents, and updates.",
      "Multi-application form": "Lets one client data set support several bank applications instead of repeated entry."
    },
    tools: {
      "Fully digitized process": "Moves expert work from scattered offline steps into one traceable digital workflow.",
      "Comparison tool": "Helps experts compare bank offers and explain tradeoffs in a consistent way.",
      "Checklists": "Makes complex mortgage steps visible, repeatable, and harder to miss.",
      "Multi-application form": "Lets experts reuse client data across several applications while keeping status clear.",
      "Settlements": "Connects completed advisory work to commission, payout, and business accountability.",
      "Support & forum": "Gives experts a shared place for operational support, questions, and product knowledge.",
      "Team & time management": "Helps larger expert teams coordinate capacity, ownership, and client follow-up.",
      "Communication & workflow mgm": "Keeps handoffs, messages, and task status visible across client and expert work.",
      "Property offer": "Links the financing path to the property offer that created the client need.",
      "Leads delegations": "Routes incoming leads to the right expert or team before momentum is lost."
    },
    administration: {
      "Call center panel": "Lets operations teams see, route, and support prospect conversations at scale.",
      "Provision settings": "Controls commission rules so the commercial model matches the expert workflow.",
      "Settlement generator": "Turns completed cases into repeatable, auditable settlement output.",
      "Product panel": "Keeps product and bank-offer configuration manageable without changing the whole system."
    }
  };

  function normalizeNodeItem(item) {
    if (item && typeof item === "object") {
      return {
        label: item.label || item.title || "Item",
        description: item.description || ""
      };
    }

    return {
      label: String(item || "Item"),
      description: ""
    };
  }

  function detailForNodeItem(node, item) {
    const normalizedItem = normalizeNodeItem(item);
    const copy = lendiNodeItemDetails[node.id] || {};
    const fallback = `${normalizedItem.label} is one part of the ${node.label || node.title || "Lendi"} workflow, showing what this card needed to support in the platform.`;

    return {
      label: normalizedItem.label,
      description: normalizedItem.description || copy[normalizedItem.label] || fallback
    };
  }

  function appendPersonIcon(element, iconName) {
    const svg = createSvgElement("svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    svg.classList.add("node-icon-svg");

    const head = createSvgElement("circle");
    head.setAttribute("cx", "12");
    head.setAttribute("cy", "8");
    head.setAttribute("r", "3.5");
    svg.appendChild(head);

    const shoulders = createSvgElement("path");
    shoulders.setAttribute("d", "M5 20c1.2-4 4-6 7-6s5.8 2 7 6");
    svg.appendChild(shoulders);

    if (iconName === "expert") {
      const tie = createSvgElement("path");
      tie.setAttribute("d", "M10.5 14.5 12 16l1.5-1.5M12 16l-1.2 4h2.4L12 16Z");
      svg.appendChild(tie);
    }

    element.appendChild(svg);
  }

  function renderLendiGraph() {
    const graph = document.querySelector("[data-lendi-node-graph]");
    const dataElement = document.getElementById("lendi-graph-data");
    const viewport = document.querySelector("[data-graph-viewport]");
    const zoomSurface = document.querySelector("[data-graph-zoom-surface]");
    const board = graph ? graph.closest(".lendi-node-board") : null;
    const fullscreenButton = board ? board.querySelector("[data-graph-fullscreen-toggle]") : null;
    const zoomInButton = board ? board.querySelector("[data-graph-zoom-in]") : null;
    const zoomOutButton = board ? board.querySelector("[data-graph-zoom-out]") : null;
    const zoomResetButton = board ? board.querySelector("[data-graph-zoom-reset]") : null;
    const zoomValue = board ? board.querySelector("[data-graph-zoom-value]") : null;
    const minGraphScale = 0.45;
    const maxGraphScale = 2.2;
    const graphZoomFactor = 1.16;
    let zoomTrackTimer = null;
    let isGestureZooming = false;

    if (!graph || !dataElement) {
      return;
    }

    let graphData;

    try {
      graphData = JSON.parse(dataElement.textContent);
    } catch (_error) {
      graph.dataset.graphError = "invalid-json";
      return;
    }

    const svg = createSvgElement("svg");
    svg.classList.add("node-graph-lines");
    svg.setAttribute("aria-hidden", "true");
    graph.appendChild(svg);

    graphData.nodes.forEach((node) => {
      let nodeElement;

      if (node.type === "icon") {
        nodeElement = createElement(
          "div",
          `node-icon node-icon-${node.tone || "green"} ${node.className || ""}`.trim()
        );
        nodeElement.dataset.nodeId = node.id;
        nodeElement.setAttribute("role", "img");
        nodeElement.setAttribute("aria-label", node.title || node.label || "Graph icon");
        appendPersonIcon(nodeElement, node.icon || "client");
      } else if (node.type === "media") {
        nodeElement = createElement("figure", `node-media ${node.className || ""}`.trim());
        nodeElement.dataset.nodeId = node.id;
        nodeElement.appendChild(createElement("div", "media-frame", node.label));
        nodeElement.appendChild(createElement("figcaption", "", node.title));
      } else {
        nodeElement = createElement("article", `node-card ${node.className || ""}`.trim());
        nodeElement.dataset.nodeId = node.id;
        nodeElement.dataset.nodeLabel = node.label || node.title || "";
        nodeElement.dataset.nodeTone = node.tone || "green";
        nodeElement.tabIndex = 0;
        nodeElement.setAttribute("aria-label", `Open ${node.label || node.title || "card"} details`);
        if (node.label) {
          nodeElement.appendChild(createElement("span", "node-card-label", node.label));
        }
        if (node.title) {
          nodeElement.appendChild(createElement("h3", "", node.title));
        }

        if (Array.isArray(node.badges) && node.badges.length) {
          const badges = createElement("div", "expert-types");
          badges.setAttribute("aria-label", `${node.label} types`);
          node.badges.forEach((badge) => {
            badges.appendChild(createElement("span", "", badge));
          });
          nodeElement.appendChild(badges);
        }

        if (Array.isArray(node.items) && node.items.length) {
          const list = createElement("ul", node.tone === "blue" ? "node-list node-list-blue" : "node-list");
          node.items.forEach((item, itemIndex) => {
            const detail = detailForNodeItem(node, item);
            const itemElement = createElement("li");
            const itemButton = createElement("button", "node-list-item-button", detail.label);

            itemButton.type = "button";
            itemButton.dataset.nodeId = node.id;
            itemButton.dataset.nodeItemIndex = String(itemIndex);
            itemButton.setAttribute("aria-label", `Open ${detail.label} details in ${node.label || node.title || "card"}`);

            itemElement.appendChild(itemButton);
            list.appendChild(itemElement);
          });
          nodeElement.appendChild(list);
        }
      }

      graph.appendChild(nodeElement);
    });

    const modalState = {
      elements: null,
      previousFocus: null,
      currentNode: null,
      activeItemIndex: -1,
      scrollFrame: 0
    };
    const previewedItems = new Set();
    let nodePopover = null;
    let activePopoverTarget = null;

    function cardNodes() {
      return graphData.nodes.filter((node) => node.type === "card");
    }

    function findGraphNode(nodeId) {
      return cardNodes().find((node) => node.id === nodeId) || null;
    }

    function nodeItems(node) {
      return Array.isArray(node.items) ? node.items : [];
    }

    function nodeLabel(node) {
      return node.label || node.title || "Lendi card";
    }

    function nodeCardElement(nodeId) {
      return graph.querySelector(`.node-card[data-node-id="${nodeId}"]`);
    }

    function itemDetail(node, itemIndex) {
      return detailForNodeItem(node, nodeItems(node)[itemIndex]);
    }

    function screenForNodeItem(node, item) {
      const detail = detailForNodeItem(node, item);
      const nodeScreens = node && typeof node.screens === "object" && !Array.isArray(node.screens)
        ? node.screens
        : {};
      const directScreen = item && typeof item === "object"
        ? item.screen || item.screenshot || item.image || null
        : null;
      const screen = directScreen
        || nodeScreens[detail.label]
        || nodeScreens[slugify(detail.label)]
        || null;

      if (!screen) {
        return null;
      }

      if (typeof screen === "string") {
        return {
          src: screen,
          alt: `${detail.label} screen`,
          caption: "Product screen"
        };
      }

      if (typeof screen === "object" && screen.src) {
        return {
          src: screen.src,
          alt: screen.alt || `${detail.label} screen`,
          caption: screen.caption || "Product screen"
        };
      }

      return null;
    }

    function createScreenFigure(screen) {
      const figure = createElement("figure", "node-detail-shot");
      const image = createElement("img", "node-detail-screen-image");
      const caption = createElement("figcaption", "node-detail-shot-caption", screen.caption);

      image.src = screen.src;
      image.alt = screen.alt;
      image.loading = "lazy";
      image.decoding = "async";
      figure.append(image, caption);
      return figure;
    }

    function createCardPreview(node, activeIndex) {
      const preview = createElement(
        "div",
        `node-detail-card-preview ${node.tone === "blue" ? "is-blue" : "is-green"}`
      );
      const label = createElement("span", "node-detail-card-label", nodeLabel(node));
      const list = createElement("ul", "node-detail-card-list");

      nodeItems(node).forEach((item, index) => {
        const detail = detailForNodeItem(node, item);
        const row = createElement("li", index === activeIndex ? "is-active" : "");
        row.appendChild(createElement("span", "", detail.label));
        list.appendChild(row);
      });

      preview.append(label, list);
      return preview;
    }

    function createDetailSection(node, item, itemIndex) {
      const detail = detailForNodeItem(node, item);
      const screen = screenForNodeItem(node, item);
      const section = createElement("section", "node-detail-section");
      const heading = createElement("div", "node-detail-section-heading");
      const dot = createElement("span", "node-detail-section-dot");
      const title = createElement("h3", "", detail.label);
      const description = createElement("p", "node-detail-description", detail.description);

      section.id = `node-detail-${node.id}-${slugify(detail.label)}`;
      section.dataset.nodeItemIndex = String(itemIndex);
      section.tabIndex = -1;
      heading.append(dot, title);
      section.classList.add(screen ? "has-screen" : "is-text-only");
      section.append(heading, description);

      if (screen) {
        section.appendChild(createScreenFigure(screen));
      }

      return section;
    }

    function setActiveNodeTab(itemIndex, revealTab = false) {
      const modal = modalState.elements;

      if (!modal || !modal.tabs) {
        return;
      }

      const safeIndex = Math.max(0, itemIndex);

      if (modalState.activeItemIndex === safeIndex && !revealTab) {
        return;
      }

      modalState.activeItemIndex = safeIndex;

      modal.tabs.querySelectorAll(".node-detail-tab").forEach((tab) => {
        const selected = tab.dataset.nodeItemIndex === String(safeIndex);
        tab.setAttribute("aria-selected", selected ? "true" : "false");
        tab.tabIndex = selected ? 0 : -1;

        if (selected && revealTab && typeof tab.scrollIntoView === "function") {
          tab.scrollIntoView({ block: "nearest", inline: "nearest" });
        }
      });
    }

    function updateActiveNodeTabFromScroll() {
      const modal = modalState.elements;

      if (!modal || !modal.body) {
        return;
      }

      const sections = Array.from(modal.body.querySelectorAll(".node-detail-section"));
      const bodyRect = modal.body.getBoundingClientRect();
      let activeIndex = 0;

      if (Math.ceil(modal.body.scrollTop + modal.body.clientHeight) >= modal.body.scrollHeight - 2) {
        activeIndex = Math.max(0, sections.length - 1);
      } else {
        sections.forEach((section, index) => {
          if (section.getBoundingClientRect().top <= bodyRect.top + 24) {
            activeIndex = index;
          }
        });
      }

      setActiveNodeTab(activeIndex, true);
    }

    function scheduleActiveNodeTabUpdate() {
      if (modalState.scrollFrame) {
        window.cancelAnimationFrame(modalState.scrollFrame);
      }

      modalState.scrollFrame = window.requestAnimationFrame(() => {
        modalState.scrollFrame = 0;
        updateActiveNodeTabFromScroll();
      });
    }

    function scrollNodeModalToSection(itemIndex, behavior = "smooth") {
      const modal = modalState.elements;

      if (!modal || !modal.body) {
        return;
      }

      const section = modal.body.querySelector(`[data-node-item-index="${itemIndex}"]`);

      if (!section) {
        return;
      }

      modal.body.scrollTo({
        top: Math.max(0, section.offsetTop - modal.body.offsetTop - 8),
        behavior
      });
      setActiveNodeTab(itemIndex, true);
    }

    function renderNodeTabs(node, items, activeIndex) {
      const modal = modalState.elements;

      if (!modal || !modal.tabs) {
        return;
      }

      clearElement(modal.tabs);
      modal.tabs.setAttribute("aria-label", `${nodeLabel(node)} sections`);

      items.forEach((item, itemIndex) => {
        const detail = detailForNodeItem(node, item);
        const tab = createElement("button", "node-detail-tab", detail.label);

        tab.type = "button";
        tab.id = `node-detail-tab-${node.id}-${slugify(detail.label)}`;
        tab.title = detail.label;
        tab.dataset.nodeItemIndex = String(itemIndex);
        tab.setAttribute("role", "tab");
        tab.setAttribute("aria-controls", `node-detail-${node.id}-${slugify(detail.label)}`);
        tab.addEventListener("click", () => {
          scrollNodeModalToSection(itemIndex, "auto");
          trackStoryEvent("story_lendi_node_detail_tab_clicked", {
            node_id: node.id,
            node_label: nodeLabel(node),
            item_label: detail.label,
            item_index: itemIndex + 1
          });
        });

        modal.tabs.appendChild(tab);
      });

      setActiveNodeTab(activeIndex, true);
    }

    function ensureNodeModal() {
      if (modalState.elements) {
        return modalState.elements;
      }

      const shell = createElement("div", "node-detail-shell");
      const panel = createElement("section", "node-detail-panel");
      const head = createElement("div", "node-detail-head");
      const title = createElement("h2", "node-detail-title");
      const tabs = createElement("div", "node-detail-tabs");
      const close = createElement("button", "node-detail-close", "x");
      const body = createElement("div", "node-detail-body");

      shell.hidden = true;
      shell.dataset.nodeModal = "";
      panel.setAttribute("role", "dialog");
      panel.setAttribute("aria-modal", "true");
      panel.setAttribute("aria-labelledby", "nodeDetailTitle");
      panel.tabIndex = -1;
      title.id = "nodeDetailTitle";
      close.type = "button";
      close.setAttribute("aria-label", "Close card details");
      tabs.setAttribute("role", "tablist");
      body.tabIndex = -1;

      head.append(title, tabs, close);
      panel.append(head, body);
      shell.appendChild(panel);
      document.body.appendChild(shell);

      close.addEventListener("click", () => closeNodeModal("close_button"));
      shell.addEventListener("click", (event) => {
        if (event.target === shell) {
          closeNodeModal("backdrop");
        }
      });
      body.addEventListener("scroll", scheduleActiveNodeTabUpdate);
      tabs.addEventListener("keydown", (event) => {
        const tabButtons = Array.from(tabs.querySelectorAll(".node-detail-tab"));
        const currentIndex = tabButtons.indexOf(document.activeElement);
        let nextIndex = currentIndex;

        if (currentIndex < 0) {
          return;
        }

        if (event.key === "ArrowRight") {
          nextIndex = (currentIndex + 1) % tabButtons.length;
        } else if (event.key === "ArrowLeft") {
          nextIndex = (currentIndex - 1 + tabButtons.length) % tabButtons.length;
        } else if (event.key === "Home") {
          nextIndex = 0;
        } else if (event.key === "End") {
          nextIndex = tabButtons.length - 1;
        } else {
          return;
        }

        event.preventDefault();
        tabButtons[nextIndex].focus();
        tabButtons[nextIndex].click();
      });

      modalState.elements = { shell, panel, title, tabs, body, close };
      return modalState.elements;
    }

    function renderNodeModal(node, targetItemIndex) {
      const modal = ensureNodeModal();
      const sourceCard = nodeCardElement(node.id);
      const nodeBackground = sourceCard
        ? getComputedStyle(sourceCard).getPropertyValue("--node-bg")
        : "";
      const items = nodeItems(node);

      modalState.currentNode = node;
      modalState.activeItemIndex = -1;
      modal.panel.style.setProperty("--node-bg", nodeBackground || "var(--white)");
      modal.panel.dataset.nodeTone = node.tone || "green";
      modal.title.textContent = nodeLabel(node);
      clearElement(modal.body);

      items.forEach((item, itemIndex) => {
        modal.body.appendChild(createDetailSection(node, item, itemIndex));
      });
      renderNodeTabs(node, items, targetItemIndex);

      modal.body.scrollTop = 0;

      window.requestAnimationFrame(() => {
        scrollNodeModalToSection(targetItemIndex, "auto");
        updateActiveNodeTabFromScroll();
      });
    }

    function openNodeModal(nodeId, targetItemIndex = 0, method = "card", sourceElement = null) {
      const node = findGraphNode(nodeId);

      if (!node || !nodeItems(node).length) {
        return;
      }

      const safeIndex = Math.max(0, Math.min(targetItemIndex, nodeItems(node).length - 1));
      const modal = ensureNodeModal();
      const detail = itemDetail(node, safeIndex);

      modalState.previousFocus = sourceElement instanceof HTMLElement
        ? sourceElement
        : document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;

      hideNodePopover();
      renderNodeModal(node, safeIndex);
      modal.shell.hidden = false;
      document.body.classList.add("node-modal-active");
      modal.panel.focus({ preventScroll: true });

      trackStoryEvent("story_lendi_node_detail_opened", {
        node_id: node.id,
        node_label: nodeLabel(node),
        item_label: detail.label,
        item_index: safeIndex + 1,
        interaction_method: method
      });
    }

    function closeNodeModal(reason = "dismissed") {
      const modal = ensureNodeModal();

      if (modal.shell.hidden) {
        return;
      }

      modal.shell.hidden = true;
      document.body.classList.remove("node-modal-active");
      modalState.currentNode = null;
      modalState.activeItemIndex = -1;

      trackStoryEvent("story_lendi_node_detail_closed", {
        close_reason: reason
      });

      if (modalState.previousFocus && typeof modalState.previousFocus.focus === "function") {
        modalState.previousFocus.focus({ preventScroll: true });
      }

      modalState.previousFocus = null;
    }

    function canUseHoverPopover() {
      return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    }

    function ensureNodePopover() {
      if (nodePopover) {
        return nodePopover;
      }

      nodePopover = createElement("div", "node-info-popover");
      nodePopover.id = "lendiNodeItemPopover";
      nodePopover.hidden = true;
      nodePopover.setAttribute("role", "tooltip");
      document.body.appendChild(nodePopover);
      return nodePopover;
    }

    function renderNodePopover(node, itemIndex) {
      const popover = ensureNodePopover();
      const detail = itemDetail(node, itemIndex);
      const title = createElement("strong", "node-info-popover-title", detail.label);
      const body = createElement("p", "node-info-popover-copy", detail.description);
      const shot = createElement("div", "node-info-popover-shot");

      shot.hidden = true;
      shot.setAttribute("aria-hidden", "true");
      clearElement(popover);
      shot.appendChild(createCardPreview(node, itemIndex));
      popover.append(title, body, shot);
    }

    function positionNodePopover(target) {
      if (!nodePopover || nodePopover.hidden || !target) {
        return;
      }

      const gap = 14;
      const margin = 12;
      const targetRect = target.getBoundingClientRect();
      const popoverRect = nodePopover.getBoundingClientRect();
      let left = targetRect.right + gap;
      let top = targetRect.top + targetRect.height / 2 - popoverRect.height / 2;

      if (left + popoverRect.width > window.innerWidth - margin) {
        left = targetRect.left - popoverRect.width - gap;
      }

      if (left < margin) {
        left = margin;
      }

      top = Math.max(margin, Math.min(top, window.innerHeight - popoverRect.height - margin));
      nodePopover.style.left = `${Math.round(left)}px`;
      nodePopover.style.top = `${Math.round(top)}px`;
    }

    function trackItemPreview(node, itemIndex, method) {
      const detail = itemDetail(node, itemIndex);
      const previewKey = `${node.id}:${itemIndex}:${method}`;

      if (previewedItems.has(previewKey)) {
        return;
      }

      previewedItems.add(previewKey);
      trackStoryEvent("story_lendi_node_item_previewed", {
        node_id: node.id,
        node_label: nodeLabel(node),
        item_label: detail.label,
        item_index: itemIndex + 1,
        interaction_method: method
      });
    }

    function showNodePopover(target, method) {
      if (!canUseHoverPopover()) {
        return;
      }

      const nodeId = target.dataset.nodeId;
      const node = findGraphNode(nodeId);
      const itemIndex = parseInt(target.dataset.nodeItemIndex || "0", 10);

      if (!node || !Number.isFinite(itemIndex)) {
        return;
      }

      const popover = ensureNodePopover();
      renderNodePopover(node, itemIndex);
      activePopoverTarget = target;
      target.setAttribute("aria-describedby", popover.id);
      popover.hidden = false;
      window.requestAnimationFrame(() => positionNodePopover(target));
      trackItemPreview(node, itemIndex, method);
    }

    function hideNodePopover() {
      if (!nodePopover) {
        return;
      }

      if (activePopoverTarget) {
        activePopoverTarget.removeAttribute("aria-describedby");
      }

      activePopoverTarget = null;
      nodePopover.hidden = true;
    }

    function closestItemButton(target) {
      if (!(target instanceof Element)) {
        return null;
      }

      const button = target.closest("[data-node-item-index]");
      return button && graph.contains(button) ? button : null;
    }

    function closestCard(target) {
      if (!(target instanceof Element)) {
        return null;
      }

      const card = target.closest(".node-card[data-node-id]");
      return card && graph.contains(card) ? card : null;
    }

    function initNodeDetails() {
      graph.addEventListener("click", (event) => {
        const itemButton = closestItemButton(event.target);

        if (itemButton) {
          event.preventDefault();
          event.stopPropagation();
          openNodeModal(
            itemButton.dataset.nodeId,
            parseInt(itemButton.dataset.nodeItemIndex || "0", 10),
            "item_click",
            itemButton
          );
          return;
        }

        const card = closestCard(event.target);
        if (card) {
          openNodeModal(card.dataset.nodeId, 0, "card_click", card);
        }
      });

      graph.addEventListener("keydown", (event) => {
        const card = closestCard(event.target);
        if (!card || event.target !== card || (event.key !== "Enter" && event.key !== " ")) {
          return;
        }

        event.preventDefault();
        openNodeModal(card.dataset.nodeId, 0, "keyboard", card);
      });

      graph.addEventListener("pointerover", (event) => {
        const itemButton = closestItemButton(event.target);
        if (itemButton) {
          showNodePopover(itemButton, "hover");
        }
      });

      graph.addEventListener("pointerout", (event) => {
        const itemButton = closestItemButton(event.target);
        if (!itemButton || (event.relatedTarget instanceof Node && itemButton.contains(event.relatedTarget))) {
          return;
        }

        hideNodePopover();
      });

      graph.addEventListener("focusin", (event) => {
        const itemButton = closestItemButton(event.target);
        if (itemButton) {
          showNodePopover(itemButton, "focus");
        }
      });

      graph.addEventListener("focusout", (event) => {
        const itemButton = closestItemButton(event.target);
        if (!itemButton || (event.relatedTarget instanceof Node && itemButton.contains(event.relatedTarget))) {
          return;
        }

        hideNodePopover();
      });

      window.addEventListener("scroll", hideNodePopover, true);
      window.addEventListener("resize", hideNodePopover);

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modalState.elements && !modalState.elements.shell.hidden) {
          event.stopImmediatePropagation();
          closeNodeModal("escape");
        }
      });
    }

    function getAnchorPoint(rect, anchor, graphRect) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      let x = centerX;
      let y = centerY;

      if (anchor === "left") {
        x = rect.left;
      } else if (anchor === "right") {
        x = rect.right;
      } else if (anchor === "top") {
        y = rect.top;
      } else if (anchor === "bottom") {
        y = rect.bottom;
      }

      return {
        x: x - graphRect.left,
        y: y - graphRect.top
      };
    }

    function getAnchorVector(anchor) {
      if (anchor === "left") {
        return { x: -1, y: 0 };
      }
      if (anchor === "right") {
        return { x: 1, y: 0 };
      }
      if (anchor === "top") {
        return { x: 0, y: -1 };
      }
      if (anchor === "bottom") {
        return { x: 0, y: 1 };
      }

      return { x: 0, y: 0 };
    }

    function getConnectionPoints(source, target, graphRect, edge) {
      const sourceRect = source.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const sourceCenterX = sourceRect.left + sourceRect.width / 2;
      const sourceCenterY = sourceRect.top + sourceRect.height / 2;
      const targetCenterX = targetRect.left + targetRect.width / 2;
      const targetCenterY = targetRect.top + targetRect.height / 2;
      const horizontal = Math.abs(targetCenterX - sourceCenterX) > 32;
      const sourceIsLeft = sourceCenterX <= targetCenterX;
      const sourceIsAbove = sourceCenterY <= targetCenterY;
      const sourceAnchor = edge.sourceAnchor || (horizontal ? (sourceIsLeft ? "right" : "left") : (sourceIsAbove ? "bottom" : "top"));
      const targetAnchor = edge.targetAnchor || (horizontal ? (sourceIsLeft ? "left" : "right") : (sourceIsAbove ? "top" : "bottom"));
      const start = getAnchorPoint(sourceRect, sourceAnchor, graphRect);
      const end = getAnchorPoint(targetRect, targetAnchor, graphRect);

      if (edge.align === "horizontal") {
        end.y = start.y;
      } else if (edge.align === "vertical") {
        end.x = start.x;
      }

      if (horizontal) {
        return {
          startX: start.x,
          startY: start.y,
          endX: end.x,
          endY: end.y,
          sourceAnchor,
          targetAnchor,
          orientation: edge.route || "horizontal"
        };
      }

      return {
        startX: start.x,
        startY: start.y,
        endX: end.x,
        endY: end.y,
        sourceAnchor,
        targetAnchor,
        orientation: edge.route || "vertical"
      };
    }

    function getPathCommand(points) {
      const clearance = 14;
      const sourceVector = getAnchorVector(points.sourceAnchor);
      const targetVector = getAnchorVector(points.targetAnchor);
      let sourceClearance = clearance;
      let targetClearance = clearance;

      if (sourceVector.x !== 0 && targetVector.x !== 0 && sourceVector.x !== targetVector.x) {
        const sharedGap = Math.abs(points.endX - points.startX);
        const sharedClearance = Math.min(clearance, Math.max(0, sharedGap / 3));
        sourceClearance = sharedClearance;
        targetClearance = sharedClearance;
      }

      if (sourceVector.y !== 0 && targetVector.y !== 0 && sourceVector.y !== targetVector.y) {
        const sharedGap = Math.abs(points.endY - points.startY);
        const sharedClearance = Math.min(clearance, Math.max(0, sharedGap / 3));
        sourceClearance = sharedClearance;
        targetClearance = sharedClearance;
      }

      const startOutX = points.startX + sourceVector.x * sourceClearance;
      const startOutY = points.startY + sourceVector.y * sourceClearance;
      const endOutX = points.endX + targetVector.x * targetClearance;
      const endOutY = points.endY + targetVector.y * targetClearance;

      if (points.orientation === "straight") {
        if (Math.abs(startOutY - endOutY) < 0.5) {
          return `M ${points.startX} ${points.startY} L ${startOutX} ${startOutY} H ${endOutX} L ${points.endX} ${points.endY}`;
        }

        if (Math.abs(startOutX - endOutX) < 0.5) {
          return `M ${points.startX} ${points.startY} L ${startOutX} ${startOutY} V ${endOutY} L ${points.endX} ${points.endY}`;
        }
      }

      if (points.orientation === "horizontal-first") {
        return `M ${points.startX} ${points.startY} L ${startOutX} ${startOutY} H ${endOutX} V ${endOutY} L ${points.endX} ${points.endY}`;
      }

      if (points.orientation === "vertical-first") {
        return `M ${points.startX} ${points.startY} L ${startOutX} ${startOutY} V ${endOutY} H ${endOutX} L ${points.endX} ${points.endY}`;
      }

      if (points.orientation === "horizontal") {
        return `M ${points.startX} ${points.startY} L ${startOutX} ${startOutY} H ${(startOutX + endOutX) / 2} V ${endOutY} H ${endOutX} L ${points.endX} ${points.endY}`;
      }

      return `M ${points.startX} ${points.startY} L ${startOutX} ${startOutY} V ${(startOutY + endOutY) / 2} H ${endOutX} V ${endOutY} L ${points.endX} ${points.endY}`;
    }

    function drawEdges() {
      const graphRect = graph.getBoundingClientRect();
      svg.setAttribute("viewBox", `0 0 ${Math.max(1, graphRect.width)} ${Math.max(1, graphRect.height)}`);
      svg.textContent = "";

      graphData.edges.forEach((edge) => {
        const source = graph.querySelector(`[data-node-id="${edge.from}"]`);
        const target = graph.querySelector(`[data-node-id="${edge.to}"]`);

        if (!source || !target) {
          return;
        }

        const points = getConnectionPoints(source, target, graphRect, edge);
        const pathCommand = getPathCommand(points);
        const path = createSvgElement("path");
        path.classList.add("graph-line", edge.tone === "blue" ? "graph-line-blue" : "graph-line-green");
        path.setAttribute("d", pathCommand);
        svg.appendChild(path);

        const node = createSvgElement("circle");
        node.classList.add("graph-node", edge.tone === "blue" ? "graph-node-blue" : "graph-node-green");
        node.setAttribute("cx", String(points.endX));
        node.setAttribute("cy", String(points.endY));
        node.setAttribute("r", "5");
        svg.appendChild(node);
      });
    }

    function getGraphScale() {
      if (!zoomSurface) {
        return 1;
      }

      return parseFloat(getComputedStyle(zoomSurface).getPropertyValue("--graph-scale")) || 1;
    }

    function getDefaultGraphScale() {
      if (!zoomSurface) {
        return 1;
      }

      const inlineScale = zoomSurface.style.getPropertyValue("--graph-scale");
      zoomSurface.style.removeProperty("--graph-scale");
      const defaultScale = getGraphScale();

      if (inlineScale) {
        zoomSurface.style.setProperty("--graph-scale", inlineScale);
      }

      return defaultScale;
    }

    function clampGraphScale(scale) {
      return Math.min(maxGraphScale, Math.max(minGraphScale, scale));
    }

    function getViewportFocusPoint(clientX, clientY) {
      if (!viewport) {
        return { x: 0, y: 0 };
      }

      const rect = viewport.getBoundingClientRect();

      if (Number.isFinite(clientX) && Number.isFinite(clientY)) {
        return {
          x: clientX - rect.left,
          y: clientY - rect.top
        };
      }

      return {
        x: viewport.clientWidth / 2,
        y: viewport.clientHeight / 2
      };
    }

    function shouldSizeZoomSurface(scale) {
      return Boolean(
        zoomSurface &&
        (Math.abs(scale - 1) > 0.001 || window.matchMedia("(max-width: 1040px)").matches)
      );
    }

    function getGraphLayoutSize() {
      if (!zoomSurface) {
        return {
          width: graph.offsetWidth,
          height: graph.offsetHeight
        };
      }

      const inlineWidth = zoomSurface.style.width;
      const inlineHeight = zoomSurface.style.height;
      zoomSurface.style.width = "";
      zoomSurface.style.height = "";

      const size = {
        width: graph.offsetWidth,
        height: graph.offsetHeight
      };

      zoomSurface.style.width = inlineWidth;
      zoomSurface.style.height = inlineHeight;
      return size;
    }

    function syncZoomSurfaceSize() {
      if (!zoomSurface) {
        return;
      }

      const scale = getGraphScale();

      if (!shouldSizeZoomSurface(scale)) {
        zoomSurface.style.width = "";
        zoomSurface.style.height = "";
        return;
      }

      const size = getGraphLayoutSize();
      zoomSurface.style.width = `${Math.ceil(size.width * scale)}px`;
      zoomSurface.style.height = `${Math.ceil(size.height * scale)}px`;
    }

    function updateZoomControls(scale) {
      const currentScale = scale || getGraphScale();
      const defaultScale = getDefaultGraphScale();
      const isAtDefault = Math.abs(currentScale - defaultScale) < 0.01;

      if (zoomValue) {
        zoomValue.textContent = `${Math.round(currentScale * 100)}%`;
      }

      if (zoomOutButton) {
        zoomOutButton.disabled = currentScale <= minGraphScale + 0.01;
      }

      if (zoomInButton) {
        zoomInButton.disabled = currentScale >= maxGraphScale - 0.01;
      }

      if (zoomResetButton) {
        zoomResetButton.disabled = isAtDefault;
      }

      if (viewport) {
        viewport.classList.toggle("is-graph-zoomed", !isAtDefault);
      }
    }

    function trackGraphZoom(method, scale) {
      if (!method) {
        return;
      }

      window.clearTimeout(zoomTrackTimer);
      zoomTrackTimer = window.setTimeout(() => {
        trackStoryEvent("story_graph_zoom_changed", {
          interaction_method: method,
          graph_scale: Number(scale.toFixed(2)),
          graph_zoom_percent: Math.round(scale * 100)
        });
      }, method === "pinch" || method === "wheel" ? 160 : 0);
    }

    function setGraphScale(nextScale, method, clientX, clientY) {
      if (!zoomSurface || !viewport) {
        return;
      }

      const previousScale = getGraphScale();
      const scale = clampGraphScale(nextScale);

      if (Math.abs(scale - previousScale) < 0.001) {
        updateZoomControls(scale);
        return;
      }

      const focusPoint = getViewportFocusPoint(clientX, clientY);
      const graphFocusX = (viewport.scrollLeft + focusPoint.x) / previousScale;
      const graphFocusY = (viewport.scrollTop + focusPoint.y) / previousScale;

      zoomSurface.style.setProperty("--graph-scale", scale.toFixed(3));
      syncZoomSurfaceSize();
      viewport.scrollLeft = graphFocusX * scale - focusPoint.x;
      viewport.scrollTop = graphFocusY * scale - focusPoint.y;
      updateZoomControls(scale);
      scheduleDraw();
      trackGraphZoom(method, scale);
    }

    function resetGraphScale(method, clientX, clientY) {
      if (!zoomSurface || !viewport) {
        return;
      }

      const previousScale = getGraphScale();
      const focusPoint = getViewportFocusPoint(clientX, clientY);
      const graphFocusX = (viewport.scrollLeft + focusPoint.x) / previousScale;
      const graphFocusY = (viewport.scrollTop + focusPoint.y) / previousScale;

      zoomSurface.style.removeProperty("--graph-scale");
      const scale = getGraphScale();
      syncZoomSurfaceSize();
      viewport.scrollLeft = graphFocusX * scale - focusPoint.x;
      viewport.scrollTop = graphFocusY * scale - focusPoint.y;
      updateZoomControls(scale);
      scheduleDraw();
      trackGraphZoom(method, scale);
    }

    function zoomGraph(direction, method) {
      const factor = direction > 0 ? graphZoomFactor : 1 / graphZoomFactor;
      setGraphScale(getGraphScale() * factor, method);
    }

    function scheduleDraw() {
      syncZoomSurfaceSize();
      window.requestAnimationFrame(drawEdges);
      window.setTimeout(drawEdges, 50);
    }

    function initZoomControls() {
      if (!zoomSurface || !viewport) {
        return;
      }

      if (zoomOutButton) {
        zoomOutButton.addEventListener("click", () => zoomGraph(-1, "button"));
      }

      if (zoomInButton) {
        zoomInButton.addEventListener("click", () => zoomGraph(1, "button"));
      }

      if (zoomResetButton) {
        zoomResetButton.addEventListener("click", () => resetGraphScale("reset"));
      }

      viewport.addEventListener("keydown", (event) => {
        if (event.key === "+" || event.key === "=") {
          event.preventDefault();
          zoomGraph(1, "keyboard");
        } else if (event.key === "-" || event.key === "_") {
          event.preventDefault();
          zoomGraph(-1, "keyboard");
        } else if (event.key === "0") {
          event.preventDefault();
          resetGraphScale("keyboard");
        }
      });

      viewport.addEventListener("wheel", (event) => {
        if (!event.ctrlKey) {
          return;
        }

        event.preventDefault();
        const factor = Math.exp(-event.deltaY * 0.002);
        setGraphScale(getGraphScale() * factor, "wheel", event.clientX, event.clientY);
      }, { passive: false });

      let gestureStartScale = 1;

      viewport.addEventListener("gesturestart", (event) => {
        isGestureZooming = true;
        gestureStartScale = getGraphScale();
        event.preventDefault();
      }, { passive: false });

      viewport.addEventListener("gesturechange", (event) => {
        isGestureZooming = true;
        event.preventDefault();
        setGraphScale(gestureStartScale * event.scale, "pinch", event.clientX, event.clientY);
      }, { passive: false });

      viewport.addEventListener("gestureend", () => {
        isGestureZooming = false;
      }, { passive: false });

      updateZoomControls();
    }

    function setFullscreenState(isExpanded) {
      if (!fullscreenButton) {
        return;
      }

      fullscreenButton.textContent = isExpanded ? "Exit" : "Fullscreen";
      fullscreenButton.setAttribute("aria-expanded", String(isExpanded));
      fullscreenButton.setAttribute("aria-label", isExpanded ? "Exit graph fullscreen" : "Expand graph fullscreen");
      document.body.classList.toggle("graph-fullscreen-active", isExpanded);
    }

    function updateFullscreenState() {
      const isExpanded = Boolean(board && (document.fullscreenElement === board || board.classList.contains("is-graph-fullscreen")));
      setFullscreenState(isExpanded);
      scheduleDraw();
      window.setTimeout(scheduleDraw, 80);
    }

    function closeFallbackFullscreen() {
      if (!board || !board.classList.contains("is-graph-fullscreen")) {
        return;
      }

      board.classList.remove("is-graph-fullscreen");
      setFullscreenState(false);
      scheduleDraw();
    }

    function initFullscreenControl() {
      if (!board || !fullscreenButton || !viewport) {
        return;
      }

      fullscreenButton.addEventListener("click", async () => {
        const isExpanded = document.fullscreenElement === board || board.classList.contains("is-graph-fullscreen");

        if (isExpanded) {
          if (document.fullscreenElement === board && document.exitFullscreen) {
            await document.exitFullscreen();
          } else {
            closeFallbackFullscreen();
          }
          return;
        }

        if (board.requestFullscreen) {
          try {
            await board.requestFullscreen();
            viewport.focus({ preventScroll: true });
            updateFullscreenState();
            return;
          } catch (_error) {
            // Fall through to the fixed overlay fallback.
          }
        }

        board.classList.add("is-graph-fullscreen");
        viewport.focus({ preventScroll: true });
        updateFullscreenState();
      });

      document.addEventListener("fullscreenchange", updateFullscreenState);
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          closeFallbackFullscreen();
        }
      });
    }

    function initDragScroll() {
      if (!viewport) {
        return;
      }

      const activePointers = new Map();
      let activePointerId = null;
      let dragState = "idle";
      let startX = 0;
      let startY = 0;
      let startScrollLeft = 0;
      let startScrollTop = 0;
      let pinchState = null;

      function rememberPointer(pointer) {
        activePointers.set(pointer.pointerId, {
          pointerId: pointer.pointerId,
          pointerType: pointer.pointerType,
          clientX: pointer.clientX,
          clientY: pointer.clientY
        });
      }

      function forgetPointer(pointerId) {
        activePointers.delete(pointerId);
      }

      function getTouchPointers() {
        return Array.from(activePointers.values()).filter((pointer) => pointer.pointerType !== "mouse");
      }

      function getPointerDistance(first, second) {
        return Math.hypot(second.clientX - first.clientX, second.clientY - first.clientY);
      }

      function getPointerMidpoint(first, second) {
        return {
          x: (first.clientX + second.clientX) / 2,
          y: (first.clientY + second.clientY) / 2
        };
      }

      function isFreeDragEnabled() {
        return Boolean(
          viewport.classList.contains("is-graph-zoomed") ||
          (board && (document.fullscreenElement === board || board.classList.contains("is-graph-fullscreen")))
        );
      }

      function resetDragFromPointer(pointer) {
        activePointerId = pointer.pointerId;
        dragState = "pending";
        startX = pointer.clientX;
        startY = pointer.clientY;
        startScrollLeft = viewport.scrollLeft;
        startScrollTop = viewport.scrollTop;
        viewport.classList.remove("is-dragging");
      }

      function capturePointer(pointerId) {
        if (!viewport.setPointerCapture) {
          return;
        }

        try {
          viewport.setPointerCapture(pointerId);
        } catch (_error) {
          // Pointer capture can fail if the browser has already started a native page gesture.
        }
      }

      function releasePointer(pointerId) {
        if (!viewport.releasePointerCapture || !viewport.hasPointerCapture || !viewport.hasPointerCapture(pointerId)) {
          return;
        }

        try {
          viewport.releasePointerCapture(pointerId);
        } catch (_error) {
          // Ignore stale pointer capture on cancelled gestures.
        }
      }

      function startDrag(event) {
        dragState = "dragging";
        viewport.classList.add("is-dragging");
        capturePointer(event.pointerId);
      }

      function stopDrag(event) {
        if (event) {
          releasePointer(event.pointerId);
        }

        activePointerId = null;
        dragState = "idle";
        viewport.classList.remove("is-dragging");
      }

      function startPinch() {
        const pointers = getTouchPointers();

        if (pointers.length < 2) {
          return;
        }

        if (activePointerId !== null) {
          stopDrag({ pointerId: activePointerId });
        }

        const first = pointers[0];
        const second = pointers[1];
        const startDistance = getPointerDistance(first, second);

        if (startDistance < 1) {
          return;
        }

        capturePointer(first.pointerId);
        capturePointer(second.pointerId);
        pinchState = {
          startDistance,
          startScale: getGraphScale()
        };
        viewport.classList.add("is-dragging");
      }

      function updatePinch(event) {
        if (isGestureZooming) {
          return;
        }

        const pointers = getTouchPointers();

        if (!pinchState || pointers.length < 2) {
          return;
        }

        const first = pointers[0];
        const second = pointers[1];
        const distance = getPointerDistance(first, second);
        const midpoint = getPointerMidpoint(first, second);

        event.preventDefault();
        setGraphScale(
          pinchState.startScale * (distance / pinchState.startDistance),
          "pinch",
          midpoint.x,
          midpoint.y
        );
      }

      function stopPinch() {
        if (!pinchState) {
          return;
        }

        getTouchPointers().forEach((pointer) => releasePointer(pointer.pointerId));
        pinchState = null;
        viewport.classList.remove("is-dragging");
      }

      viewport.addEventListener("pointerdown", (event) => {
        if (event.button !== 0 && event.pointerType === "mouse") {
          return;
        }

        if (closestCard(event.target)) {
          return;
        }

        rememberPointer(event);

        if (event.pointerType !== "mouse" && getTouchPointers().length >= 2) {
          event.preventDefault();
          startPinch();
          return;
        }

        if (activePointerId !== null || pinchState) {
          return;
        }

        resetDragFromPointer(activePointers.get(event.pointerId));

        if (event.pointerType === "mouse") {
          capturePointer(event.pointerId);
        }
      });

      viewport.addEventListener("pointermove", (event) => {
        if (activePointers.has(event.pointerId)) {
          rememberPointer(event);
        }

        if (pinchState || (event.pointerType !== "mouse" && getTouchPointers().length >= 2)) {
          if (!pinchState) {
            startPinch();
          }

          updatePinch(event);
          return;
        }

        if (activePointerId !== event.pointerId) {
          return;
        }

        const deltaX = event.clientX - startX;
        const deltaY = event.clientY - startY;

        if (dragState === "pending") {
          const absX = Math.abs(deltaX);
          const absY = Math.abs(deltaY);

          if (Math.max(absX, absY) < 7) {
            return;
          }

          if (!isFreeDragEnabled() && absY > absX) {
            stopDrag(event);
            return;
          }

          startDrag(event);
        }

        event.preventDefault();
        viewport.scrollLeft = startScrollLeft - deltaX;
        viewport.scrollTop = startScrollTop - deltaY;
      });

      function endPointer(event) {
        const wasPinching = Boolean(pinchState);
        forgetPointer(event.pointerId);
        releasePointer(event.pointerId);

        if (wasPinching) {
          if (getTouchPointers().length < 2) {
            stopPinch();
          }
          return;
        }

        if (activePointerId !== event.pointerId) {
          return;
        }

        stopDrag(event);
      }

      viewport.addEventListener("pointerup", endPointer);
      viewport.addEventListener("pointercancel", endPointer);
      viewport.addEventListener("lostpointercapture", endPointer);
    }

    function handleGraphResize() {
      updateZoomControls();
      scheduleDraw();
    }

    window.addEventListener("load", handleGraphResize);
    window.addEventListener("resize", handleGraphResize);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(scheduleDraw);
    }

    if ("ResizeObserver" in window) {
      const observer = new ResizeObserver(scheduleDraw);
      observer.observe(graph);
      graph.querySelectorAll("[data-node-id]").forEach((node) => observer.observe(node));
    }

    initNodeDetails();
    initZoomControls();
    initDragScroll();
    initFullscreenControl();
    updateZoomControls();
    scheduleDraw();
  }

  function trackStoryEvent(eventName, properties) {
    const eventProperties = Object.assign({
      page_path: window.location.pathname,
      story_page_type: pageType,
      case_id: caseId
    }, properties || {});

    window.uxrulerStoryEvents = window.uxrulerStoryEvents || [];
    window.uxrulerStoryEvents.push({ event: eventName, properties: eventProperties });

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, ...eventProperties });

    if (typeof window.CustomEvent === "function") {
      window.dispatchEvent(new CustomEvent(eventName, { detail: eventProperties }));
    }

    if (window.posthog && typeof window.posthog.capture === "function") {
      window.posthog.capture(eventName, eventProperties);
    }
  }

  const visitedCaseNotesStorageKey = "uxruler.story.visitedCaseNotes";

  function getVisitedCaseNotesStorage() {
    try {
      return window.localStorage;
    } catch {
      return null;
    }
  }

  function readVisitedCaseNotes() {
    const storage = getVisitedCaseNotesStorage();

    if (!storage) {
      return new Set();
    }

    try {
      const storedCaseNotes = JSON.parse(storage.getItem(visitedCaseNotesStorageKey) || "[]");
      return new Set(Array.isArray(storedCaseNotes) ? storedCaseNotes.map(String).filter(Boolean) : []);
    } catch {
      return new Set();
    }
  }

  function writeVisitedCaseNotes(visitedCaseNotes) {
    const storage = getVisitedCaseNotesStorage();

    if (!storage) {
      return;
    }

    try {
      storage.setItem(visitedCaseNotesStorageKey, JSON.stringify(Array.from(visitedCaseNotes).sort()));
    } catch {
      // Browsers can block localStorage in privacy modes; the visual state is optional.
    }
  }

  function getTimelineCaseTarget(timelineItem) {
    const caseTarget = timelineItem.dataset.caseTarget;
    const nestedCaseTarget = timelineItem.querySelector("[data-case-target]");
    return caseTarget || nestedCaseTarget?.dataset.caseTarget || "";
  }

  function applyVisitedCaseNotes(visitedCaseNotes) {
    document.querySelectorAll(".timeline.note-wall .timeline-item").forEach((timelineItem) => {
      const caseTarget = getTimelineCaseTarget(timelineItem);
      timelineItem.classList.toggle("is-visited-case", Boolean(caseTarget && visitedCaseNotes.has(caseTarget)));
    });
  }

  function initVisitedCaseNotes() {
    const visitedCaseNotes = readVisitedCaseNotes();

    if (caseId) {
      visitedCaseNotes.add(caseId);
      writeVisitedCaseNotes(visitedCaseNotes);
    }

    applyVisitedCaseNotes(visitedCaseNotes);

    document.querySelectorAll('[data-track="story_case_opened"][data-case-target]').forEach((element) => {
      element.addEventListener("click", () => {
        const caseTarget = element.dataset.caseTarget;

        if (!caseTarget) {
          return;
        }

        visitedCaseNotes.add(caseTarget);
        writeVisitedCaseNotes(visitedCaseNotes);

        const timelineItem = element.closest(".timeline.note-wall .timeline-item");

        if (timelineItem) {
          timelineItem.classList.add("is-visited-case");
        }
      }, { capture: true });
    });
  }

  function normalizeSurveySearchText(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function portfolioSurveyQuestionsMetadata(survey) {
    return (survey.questions || []).map((question) => ({
      id: question.id,
      question: question.question,
      type: question.type,
      scale: question.scale
    }));
  }

  function portfolioSurveyFormProperties(form) {
    if (!form || !form.dataset) {
      return {
        survey_stage: "portfolio_rating",
        survey_trigger: "story_case_notes_inline",
        survey_surface: caseId ? "case_footer" : "story_index"
      };
    }

    return {
      survey_stage: form.dataset.surveyStage || "portfolio_rating",
      survey_trigger: form.dataset.surveyTrigger || "story_case_notes_inline",
      survey_surface: form.dataset.surveySurface || (caseId ? "case_footer" : "story_index")
    };
  }

  function portfolioSurveyEventProperties(rating, feedback, form, properties) {
    const cleanRating = String(rating || "").trim();
    const cleanFeedback = String(feedback || "").trim();
    const [ratingQuestion, feedbackQuestion] = activePortfolioSurvey.questions;
    const eventProperties = Object.assign({
      $survey_id: activePortfolioSurvey.id,
      $survey_questions: portfolioSurveyQuestionsMetadata(activePortfolioSurvey),
      $survey_response: cleanRating,
      $survey_response_1: cleanFeedback,
      [`$survey_response_${ratingQuestion.id}`]: cleanRating,
      [`$survey_response_${feedbackQuestion.id}`]: cleanFeedback,
      survey_source: activePortfolioSurvey.source || "static_story_form",
      portfolio_rating: Number(cleanRating),
      feedback_length: cleanFeedback.length,
      has_feedback: Boolean(cleanFeedback)
    }, portfolioSurveyFormProperties(form), properties || {});

    if (cleanFeedback) {
      eventProperties.feedback = cleanFeedback;
    }

    return eventProperties;
  }

  function portfolioSurveyLifecycleProperties(form, properties) {
    return Object.assign({
      $survey_id: activePortfolioSurvey.id,
      $survey_questions: portfolioSurveyQuestionsMetadata(activePortfolioSurvey),
      survey_source: activePortfolioSurvey.source || "static_story_form"
    }, portfolioSurveyFormProperties(form), properties || {});
  }

  function findPortfolioPosthogSurvey(surveys) {
    const candidates = Array.isArray(surveys) ? surveys : [];

    return candidates.find((survey) => {
      if (!survey || survey.type !== "api" || !Array.isArray(survey.questions)) {
        return false;
      }

      const searchable = normalizeSurveySearchText([
        survey.name,
        survey.description,
        ...survey.questions.map((question) => question.question)
      ].join(" "));
      const looksLikePortfolio = searchable.includes("portfolio") || searchable.includes("story");
      const looksLikeRating = searchable.includes("rate") || searchable.includes("rating") || searchable.includes("star");
      const hasRatingQuestion = survey.questions.some((question) => {
        const type = normalizeSurveySearchText(question.type);
        const text = normalizeSurveySearchText(question.question);
        return type.includes("rating") || text.includes("rate") || text.includes("star");
      });
      const hasFeedbackQuestion = survey.questions.some((question) => {
        const type = normalizeSurveySearchText(question.type);
        const text = normalizeSurveySearchText(question.question);
        return type.includes("open") || text.includes("feedback") || text.includes("clearer") || text.includes("improve");
      });

      return looksLikePortfolio && looksLikeRating && hasRatingQuestion && hasFeedbackQuestion;
    });
  }

  function applyPortfolioPosthogSurvey(survey, form) {
    const ratingQuestion = survey.questions.find((question) => {
      const type = normalizeSurveySearchText(question.type);
      const text = normalizeSurveySearchText(question.question);
      return type.includes("rating") || text.includes("rate") || text.includes("star");
    });
    const feedbackQuestion = survey.questions.find((question) => {
      const type = normalizeSurveySearchText(question.type);
      const text = normalizeSurveySearchText(question.question);
      return type.includes("open") || text.includes("feedback") || text.includes("clearer") || text.includes("improve");
    });

    if (!ratingQuestion || !feedbackQuestion) {
      return false;
    }

    activePortfolioSurvey = {
      id: survey.id,
      source: "posthog_api",
      questions: [
        Object.assign({}, portfolioSurveyFallback.questions[0], ratingQuestion),
        Object.assign({}, portfolioSurveyFallback.questions[1], feedbackQuestion)
      ]
    };

    form.dataset.posthogSurveyId = activePortfolioSurvey.id;
    form.dataset.surveySource = activePortfolioSurvey.source;
    return true;
  }

  function syncPortfolioPosthogSurvey(form) {
    form.dataset.posthogSurveyId = activePortfolioSurvey.id;
    form.dataset.surveySource = activePortfolioSurvey.source;

    if (!window.posthog || typeof window.posthog.getActiveMatchingSurveys !== "function") {
      trackStoryEvent("story_portfolio_survey_unavailable", portfolioSurveyLifecycleProperties(form, {
        unavailable_reason: window.posthog ? "survey_api_unavailable" : "posthog_unavailable",
        fallback_survey_id: activePortfolioSurvey.id
      }));
      return;
    }

    window.posthog.getActiveMatchingSurveys((surveys) => {
      const survey = findPortfolioPosthogSurvey(surveys);

      if (!survey || !applyPortfolioPosthogSurvey(survey, form)) {
        trackStoryEvent("story_portfolio_survey_unavailable", portfolioSurveyLifecycleProperties(form, {
          unavailable_reason: survey ? "missing_rating_or_feedback_question" : "no_matching_api_survey",
          fallback_survey_id: portfolioSurveyFallback.id
        }));
      }
    });
  }

  function initPortfolioSurvey() {
    const forms = Array.from(document.querySelectorAll("[data-portfolio-survey-form]"));

    if (!forms.length) {
      return;
    }

    forms.forEach(initPortfolioSurveyForm);
  }

  function initPortfolioSurveyForm(form) {
    const ratingInputs = Array.from(form.querySelectorAll('input[name="portfolio-rating"]'));
    const starLabels = Array.from(form.querySelectorAll(".portfolio-star"));
    const followup = form.querySelector("[data-portfolio-survey-followup]");
    const feedback = form.querySelector("[data-portfolio-feedback]");
    const status = form.querySelector("[data-portfolio-survey-status]");
    const success = form.querySelector("[data-portfolio-survey-success]");
    const ratingField = form.querySelector(".portfolio-rating-field");
    let selectedRating = "";
    let shownTracked = false;

    function setStatus(message) {
      if (status) {
        status.textContent = message || "";
      }
    }

    function setStars(rating) {
      const value = Number(rating) || 0;
      starLabels.forEach((label, index) => {
        label.classList.toggle("is-active", index < value);
      });
    }

    function setStarPreview(rating) {
      const value = Number(rating) || 0;
      const starGroup = form.querySelector("[data-portfolio-rating-stars]");

      if (starGroup) {
        starGroup.classList.add("is-previewing");
      }

      starLabels.forEach((label, index) => {
        label.classList.toggle("is-preview", index < value);
      });
    }

    function clearStarPreview() {
      const starGroup = form.querySelector("[data-portfolio-rating-stars]");

      if (starGroup) {
        starGroup.classList.remove("is-previewing");
      }

      starLabels.forEach((label) => {
        label.classList.remove("is-preview");
      });
    }

    function showFollowup(rating) {
      selectedRating = String(rating || "");
      form.dataset.portfolioRating = selectedRating;
      form.classList.add("has-rating");
      setStars(selectedRating);
      setStatus("");

      if (followup) {
        followup.hidden = false;
      }
    }

    function trackShown() {
      if (shownTracked) {
        return;
      }

      shownTracked = true;
      trackStoryEvent("story_portfolio_survey_shown", portfolioSurveyLifecycleProperties(form));
      trackStoryEvent("survey shown", portfolioSurveyLifecycleProperties(form));
    }

    syncPortfolioPosthogSurvey(form);

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.28)) {
          trackShown();
          observer.disconnect();
        }
      }, { threshold: [0.28] });
      observer.observe(form);
    } else {
      trackShown();
    }

    ratingInputs.forEach((input) => {
      input.addEventListener("change", () => showFollowup(input.value));
      input.addEventListener("mouseenter", () => setStarPreview(input.value));
      input.addEventListener("focus", () => setStarPreview(input.value));
      input.addEventListener("blur", clearStarPreview);
    });

    const starGroup = form.querySelector("[data-portfolio-rating-stars]");
    if (starGroup) {
      starGroup.addEventListener("mouseleave", clearStarPreview);
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const checkedRating = form.querySelector('input[name="portfolio-rating"]:checked');
      selectedRating = checkedRating ? checkedRating.value : selectedRating;

      if (!selectedRating) {
        setStatus("Choose a star rating first.");
        return;
      }

      const cleanFeedback = feedback && "value" in feedback ? feedback.value.trim() : "";
      const surveyProperties = portfolioSurveyEventProperties(selectedRating, cleanFeedback, form);

      trackStoryEvent("story_portfolio_rating_sent", surveyProperties);
      trackStoryEvent("survey sent", surveyProperties);
      setStatus("");

      if (ratingField) {
        ratingField.disabled = true;
      }
      if (followup) {
        followup.hidden = true;
      }
      if (success) {
        success.hidden = false;
        success.focus();
      }
    });
  }

  function initLendiStickerStack() {
    const stack = document.querySelector("[data-lendi-sticker-stack]");

    if (!stack) {
      return;
    }

    const total = parseInt(stack.dataset.stickerCount || "0", 10);
    const basePath = stack.dataset.stickerBase || "";
    const extension = stack.dataset.stickerExtension || ".svg";
    const images = Array.from(stack.querySelectorAll("[data-sticker-image]"));
    const counter = document.querySelector("[data-sticker-counter]");
    const previousButton = document.querySelector("[data-sticker-prev]");
    const nextButton = document.querySelector("[data-sticker-next]");
    let currentIndex = 0;

    if (!total || !basePath || !images.length) {
      return;
    }

    function normalizeIndex(index) {
      return ((index % total) + total) % total;
    }

    function getStickerSource(index) {
      return `${basePath}${String(normalizeIndex(index) + 1).padStart(2, "0")}${extension}`;
    }

    function updateStickerStack(method) {
      images.forEach((image) => {
        const offset = parseInt(image.dataset.stickerOffset || "0", 10);
        const stickerIndex = normalizeIndex(currentIndex + offset);
        image.src = getStickerSource(stickerIndex);
        image.alt = offset === 0 ? `Lendi sticker ${stickerIndex + 1} of ${total}` : "";
      });

      if (counter) {
        counter.textContent = `${String(currentIndex + 1).padStart(2, "0")} / ${total}`;
      }

      stack.setAttribute("aria-label", `Show next Lendi sticker. Current sticker ${currentIndex + 1} of ${total}.`);

      if (method) {
        trackStoryEvent("story_lendi_sticker_changed", {
          interaction_method: method,
          sticker_index: currentIndex + 1,
          sticker_total: total
        });
      }
    }

    function animateStack() {
      stack.classList.remove("is-sticker-flipped");
      window.requestAnimationFrame(() => {
        stack.classList.add("is-sticker-flipped");
      });
    }

    function showSticker(delta, method) {
      currentIndex = normalizeIndex(currentIndex + delta);
      updateStickerStack(method);
      animateStack();
    }

    stack.addEventListener("click", () => showSticker(1, "stack"));

    if (previousButton) {
      previousButton.addEventListener("click", () => showSticker(-1, "previous_button"));
    }

    if (nextButton) {
      nextButton.addEventListener("click", () => showSticker(1, "next_button"));
    }

    updateStickerStack();
  }

  function initLendiPdfPageStack() {
    const stack = document.querySelector("[data-lendi-pdf-stack]");

    if (!stack) {
      return;
    }

    const total = parseInt(stack.dataset.pdfPageCount || "0", 10);
    const basePath = stack.dataset.pdfPageBase || "";
    const extension = stack.dataset.pdfPageExtension || ".png";
    const images = Array.from(stack.querySelectorAll("[data-pdf-page-image]"));
    const magnifier = stack.querySelector("[data-pdf-magnifier]");
    const magnifiedPages = new Set();
    let currentIndex = 0;

    if (!total || !basePath || !images.length) {
      return;
    }

    function normalizeIndex(index) {
      return ((index % total) + total) % total;
    }

    function getPageSource(index) {
      return `${basePath}${String(normalizeIndex(index) + 1).padStart(2, "0")}${extension}`;
    }

    function updatePageStack(method) {
      images.forEach((image) => {
        const offset = parseInt(image.dataset.pdfPageOffset || "0", 10);
        const pageIndex = normalizeIndex(currentIndex + offset);

        image.src = getPageSource(pageIndex);
        image.alt = offset === 0 ? `Lendi consultation screen page ${pageIndex + 1} of ${total}` : "";
      });

      stack.setAttribute("aria-label", `Show next Lendi consultation screen. Current page ${currentIndex + 1} of ${total}.`);

      if (method) {
        trackStoryEvent("story_lendi_pdf_page_changed", {
          interaction_method: method,
          page_index: currentIndex + 1,
          page_total: total
        });
      }
    }

    function animateStack() {
      stack.classList.remove("is-pdf-flipped");
      window.requestAnimationFrame(() => {
        stack.classList.add("is-pdf-flipped");
      });
    }

    function canUseMagnifier() {
      return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    }

    function frontPageImage() {
      return stack.querySelector(".case-pdf-page-front img");
    }

    function hideMagnifier() {
      stack.classList.remove("is-magnifying");
    }

    function updateMagnifier(event) {
      const image = frontPageImage();

      if (!magnifier || !image || !canUseMagnifier()) {
        return;
      }

      const imageRect = image.getBoundingClientRect();
      const insideImage = event.clientX >= imageRect.left
        && event.clientX <= imageRect.right
        && event.clientY >= imageRect.top
        && event.clientY <= imageRect.bottom;

      if (!insideImage) {
        hideMagnifier();
        return;
      }

      const stackRect = stack.getBoundingClientRect();
      const ratioX = (event.clientX - imageRect.left) / imageRect.width;
      const ratioY = (event.clientY - imageRect.top) / imageRect.height;
      const zoom = 6.2;
      const lensWidth = magnifier.offsetWidth || 240;
      const lensHeight = magnifier.offsetHeight || 240;
      const scaledWidth = imageRect.width * zoom;
      const scaledHeight = imageRect.height * zoom;
      const pageNumber = currentIndex + 1;

      magnifier.style.left = `${Math.round(event.clientX - stackRect.left)}px`;
      magnifier.style.top = `${Math.round(event.clientY - stackRect.top)}px`;
      magnifier.style.backgroundImage = `url("${image.currentSrc || image.src}")`;
      magnifier.style.backgroundSize = `${Math.round(scaledWidth)}px ${Math.round(scaledHeight)}px`;
      magnifier.style.backgroundPosition = `${Math.round(lensWidth / 2 - ratioX * scaledWidth)}px ${Math.round(lensHeight / 2 - ratioY * scaledHeight)}px`;
      stack.classList.add("is-magnifying");

      if (!magnifiedPages.has(pageNumber)) {
        magnifiedPages.add(pageNumber);
        trackStoryEvent("story_lendi_pdf_magnifier_used", {
          page_index: pageNumber,
          page_total: total
        });
      }
    }

    stack.addEventListener("click", () => {
      currentIndex = normalizeIndex(currentIndex + 1);
      updatePageStack("stack");
      animateStack();
      hideMagnifier();
    });
    stack.addEventListener("pointermove", updateMagnifier);
    stack.addEventListener("pointerleave", hideMagnifier);
    stack.addEventListener("blur", hideMagnifier);

    updatePageStack();
  }

  function initCaseScreenMagnifiers() {
    const cards = Array.from(document.querySelectorAll("[data-screen-magnifier-card]"));

    if (!cards.length) {
      return;
    }

    function canUseMagnifier() {
      return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    }

    cards.forEach((card) => {
      const images = Array.from(card.querySelectorAll("[data-screen-magnifier-image]"));
      const magnifier = card.querySelector("[data-screen-magnifier]");
      const frame = magnifier ? magnifier.closest(".case-screen-frame") : null;

      if (!images.length || !magnifier || !frame) {
        return;
      }

      function hideMagnifier() {
        card.classList.remove("is-magnifying");
        magnifier.style.opacity = "0";
        magnifier.style.transform = "translate(-50%, -50%) scale(0.92)";
      }

      function updateMagnifier(event) {
        if (!canUseMagnifier()) {
          hideMagnifier();
          return;
        }

        let image = null;
        let imageRect = null;

        images.some((candidateImage) => {
          const candidateRect = candidateImage.getBoundingClientRect();
          const insideCandidate = event.clientX >= candidateRect.left
            && event.clientX <= candidateRect.right
            && event.clientY >= candidateRect.top
            && event.clientY <= candidateRect.bottom;

          if (insideCandidate) {
            image = candidateImage;
            imageRect = candidateRect;
            return true;
          }

          return false;
        });

        if (!image || !imageRect) {
          hideMagnifier();
          return;
        }

        const frameRect = frame.getBoundingClientRect();
        const ratioX = (event.clientX - imageRect.left) / imageRect.width;
        const ratioY = (event.clientY - imageRect.top) / imageRect.height;
        const zoom = 3.2;
        const lensWidth = magnifier.offsetWidth || 320;
        const lensHeight = magnifier.offsetHeight || 320;
        const scaledWidth = imageRect.width * zoom;
        const scaledHeight = imageRect.height * zoom;

        magnifier.style.left = `${Math.round(event.clientX - frameRect.left)}px`;
        magnifier.style.top = `${Math.round(event.clientY - frameRect.top)}px`;
        magnifier.style.backgroundImage = `url("${image.currentSrc || image.src}")`;
        magnifier.style.backgroundSize = `${Math.round(scaledWidth)}px ${Math.round(scaledHeight)}px`;
        magnifier.style.backgroundPosition = `${Math.round(lensWidth / 2 - ratioX * scaledWidth)}px ${Math.round(lensHeight / 2 - ratioY * scaledHeight)}px`;
        magnifier.style.opacity = "1";
        magnifier.style.transform = "translate(-50%, -50%) scale(1)";
        card.classList.add("is-magnifying");
      }

      frame.addEventListener("pointermove", updateMagnifier);
      frame.addEventListener("pointerleave", hideMagnifier);
      frame.addEventListener("blur", hideMagnifier);
    });
  }

  function initBeforeAfterComparisons() {
    const comparisons = Array.from(document.querySelectorAll("[data-before-after-comparison]"));

    comparisons.forEach((comparison) => {
      const range = comparison.querySelector(".case-comparison-range");
      const frame = comparison.querySelector(".case-comparison-frame");
      let isDragging = false;
      let lastMethod = "range";
      let trackTimer = 0;

      if (!range || !frame) {
        return;
      }

      function clampComparisonValue(value) {
        const numericValue = Number.parseFloat(value);

        if (!Number.isFinite(numericValue)) {
          return 50;
        }

        return Math.max(4, Math.min(96, numericValue));
      }

      function trackComparisonChange(method, percent) {
        if (!method) {
          return;
        }

        window.clearTimeout(trackTimer);
        trackTimer = window.setTimeout(() => {
          trackStoryEvent("story_lendi_comparison_changed", {
            comparison_id: comparison.dataset.comparisonId || "before-after",
            comparison_position: Math.round(percent),
            interaction_method: method
          });
        }, method === "drag" ? 220 : 0);
      }

      function setComparisonValue(value, method) {
        const percent = clampComparisonValue(value);

        comparison.style.setProperty("--comparison-position", `${percent}%`);
        range.value = String(Math.round(percent));
        range.setAttribute("aria-valuetext", `${Math.round(percent)}% before visible`);
        trackComparisonChange(method, percent);
      }

      function setComparisonFromPointer(event, method) {
        const rect = range.getBoundingClientRect();

        if (!rect.width) {
          return;
        }

        setComparisonValue(((event.clientX - rect.left) / rect.width) * 100, method);
      }

      function setComparisonFromKey(event) {
        const currentValue = clampComparisonValue(range.value);
        const keySteps = {
          ArrowLeft: -1,
          ArrowDown: -1,
          ArrowRight: 1,
          ArrowUp: 1,
          PageDown: -10,
          PageUp: 10
        };

        if (event.key === "Home") {
          event.preventDefault();
          setComparisonValue(4, "keyboard");
          return;
        }

        if (event.key === "End") {
          event.preventDefault();
          setComparisonValue(96, "keyboard");
          return;
        }

        if (Object.prototype.hasOwnProperty.call(keySteps, event.key)) {
          event.preventDefault();
          setComparisonValue(currentValue + keySteps[event.key], "keyboard");
        }
      }

      range.addEventListener("pointerdown", (event) => {
        isDragging = true;
        lastMethod = "drag";
        setComparisonFromPointer(event, "drag");

        if (typeof range.setPointerCapture === "function") {
          range.setPointerCapture(event.pointerId);
        }
      });

      range.addEventListener("pointermove", (event) => {
        if (!isDragging) {
          return;
        }

        setComparisonFromPointer(event, "drag");
      });

      range.addEventListener("pointerup", (event) => {
        isDragging = false;

        if (typeof range.releasePointerCapture === "function") {
          range.releasePointerCapture(event.pointerId);
        }
      });

      range.addEventListener("pointercancel", () => {
        isDragging = false;
      });

      range.addEventListener("keydown", (event) => {
        lastMethod = "keyboard";
        setComparisonFromKey(event);
      });

      range.addEventListener("input", () => {
        setComparisonValue(range.value, lastMethod);
      });

      range.addEventListener("change", () => {
        setComparisonValue(range.value, lastMethod);
      });

      setComparisonValue(range.value);
    });
  }

  function initCaseVideoControls() {
    const controlGroups = Array.from(document.querySelectorAll("[data-video-controls]"));

    controlGroups.forEach((group) => {
      const figure = group.closest("figure");
      const video = figure ? figure.querySelector("video") : null;
      const toggle = group.querySelector('[data-video-control="toggle"]');
      const rewind = group.querySelector('[data-video-control="rewind"]');
      const toggleIcon = toggle ? toggle.querySelector("[data-video-toggle-icon]") : null;

      if (!video || !toggle || !rewind || !toggleIcon) {
        return;
      }

      function syncToggle() {
        const isPaused = video.paused || video.ended;
        toggleIcon.textContent = isPaused ? ">" : "II";
        toggle.setAttribute("aria-label", isPaused ? "Play prototype clip" : "Pause prototype clip");
        toggle.setAttribute("title", isPaused ? "Play prototype clip" : "Pause prototype clip");
      }

      toggle.addEventListener("click", () => {
        if (video.paused || video.ended) {
          video.play().catch(() => {
            syncToggle();
          });
        } else {
          video.pause();
        }

        syncToggle();
      });

      rewind.addEventListener("click", () => {
        video.currentTime = 0;
        syncToggle();
      });

      video.addEventListener("play", syncToggle);
      video.addEventListener("pause", syncToggle);
      video.addEventListener("ended", syncToggle);
      syncToggle();
    });
  }

  function initLendiTitleScrollPreview() {
    const frames = Array.from(document.querySelectorAll("[data-lendi-title-scroll]"));

    if (!frames.length) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopPointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sideBySideLayout = window.matchMedia("(min-width: 1401px)");

    frames.forEach((frame) => {
      const image = frame.querySelector("img");
      const media = frame.closest(".lendi-title-media");
      const titleNote = media ? media.closest(".case-title-note") : null;
      const copy = titleNote ? titleNote.querySelector(".case-title-copy") : null;
      let animationFrame = 0;
      let lastTimestamp = 0;
      let direction = 1;
      let isRunning = false;
      let userStopped = false;
      let rolloutComplete = false;
      let rolloutTimer = 0;
      const speed = 18;
      const rolloutAutoscrollDelay = 1490;

      function syncRolloutMetrics() {
        if (!media) {
          return;
        }

        const frameHeight = Math.ceil(frame.getBoundingClientRect().height);

        if (frameHeight > 0) {
          media.style.setProperty("--lendi-title-frame-height", `${frameHeight}px`);
          media.style.setProperty("--lendi-title-frame-offset", `${-frameHeight}px`);
        } else {
          media.style.removeProperty("--lendi-title-frame-height");
          media.style.removeProperty("--lendi-title-frame-offset");
        }
      }

      function syncPreviewSize() {
        if (!media || !titleNote || !copy || !desktopPointer.matches || !sideBySideLayout.matches) {
          if (media) {
            media.style.removeProperty("--lendi-title-media-height");
            media.style.removeProperty("--lendi-title-media-width");
          }
          syncRolloutMetrics();
          return;
        }

        const noteStyles = window.getComputedStyle(titleNote);
        const copyRect = copy.getBoundingClientRect();
        const titleRect = titleNote.getBoundingClientRect();
        const gap = Number.parseFloat(noteStyles.columnGap || noteStyles.gap || "0") || 0;
        const paddingLeft = Number.parseFloat(noteStyles.paddingLeft || "0") || 0;
        const paddingRight = Number.parseFloat(noteStyles.paddingRight || "0") || 0;
        const titleContentWidth = Math.max(0, titleRect.width - paddingLeft - paddingRight);
        const copyHeight = Math.max(0, Math.ceil(copyRect.height));
        const availableWidth = Math.max(0, Math.floor(titleContentWidth - copyRect.width - gap));

        if (!copyHeight || availableWidth < 120) {
          media.style.removeProperty("--lendi-title-media-height");
          media.style.removeProperty("--lendi-title-media-width");
          syncRolloutMetrics();
          return;
        }

        const caption = media.querySelector("figcaption");
        const captionHeight = caption ? Math.ceil(caption.getBoundingClientRect().height) : 0;
        const frameHeight = Math.max(120, copyHeight - captionHeight);
        const proportionalWidth = Math.round(frameHeight * 1.6);
        const mediaWidth = Math.min(availableWidth, proportionalWidth);

        media.style.setProperty("--lendi-title-media-height", `${copyHeight}px`);
        media.style.setProperty("--lendi-title-media-width", `${mediaWidth}px`);
        syncRolloutMetrics();
      }

      function startRollout() {
        if (!media || media.dataset.rolloutReady === "true") {
          return;
        }

        media.dataset.rolloutReady = "true";
        media.classList.add("is-rollout-ready");

        if (reduceMotion.matches) {
          rolloutComplete = true;
        }
      }

      function startAutoscrollAfterRollout() {
        if (reduceMotion.matches) {
          rolloutComplete = true;
          startAutoscroll();
          return;
        }

        if (rolloutTimer) {
          return;
        }

        rolloutTimer = window.setTimeout(() => {
          rolloutTimer = 0;
          rolloutComplete = true;
          startAutoscroll();
        }, rolloutAutoscrollDelay);
      }

      function maxScroll() {
        return Math.max(0, frame.scrollHeight - frame.clientHeight);
      }

      function stopAutoscroll() {
        if (userStopped) {
          return;
        }

        userStopped = true;
        isRunning = false;
        frame.classList.add("is-user-controlled");
        frame.dataset.scrollAutoplay = "stopped";

        if (rolloutTimer) {
          window.clearTimeout(rolloutTimer);
          rolloutTimer = 0;
        }

        if (animationFrame) {
          window.cancelAnimationFrame(animationFrame);
          animationFrame = 0;
        }
      }

      function step(timestamp) {
        if (!isRunning) {
          return;
        }

        const scrollLimit = maxScroll();

        if (scrollLimit <= 2) {
          animationFrame = window.requestAnimationFrame(step);
          lastTimestamp = timestamp;
          return;
        }

        if (!lastTimestamp) {
          lastTimestamp = timestamp;
        }

        const elapsed = Math.min(80, timestamp - lastTimestamp) / 1000;
        lastTimestamp = timestamp;

        let nextScroll = frame.scrollTop + direction * speed * elapsed;

        if (nextScroll >= scrollLimit) {
          nextScroll = scrollLimit;
          direction = -1;
        } else if (nextScroll <= 0) {
          nextScroll = 0;
          direction = 1;
        }

        frame.scrollTop = nextScroll;
        animationFrame = window.requestAnimationFrame(step);
      }

      function startAutoscroll() {
        if (!rolloutComplete || userStopped || isRunning || reduceMotion.matches || !desktopPointer.matches || !sideBySideLayout.matches || maxScroll() <= 2) {
          return;
        }

        isRunning = true;
        lastTimestamp = 0;
        frame.dataset.scrollAutoplay = "running";
        animationFrame = window.requestAnimationFrame(step);
      }

      frame.addEventListener("wheel", stopAutoscroll, { passive: true, once: true });
      frame.addEventListener("pointerdown", stopAutoscroll, { passive: true, once: true });
      frame.addEventListener("touchstart", stopAutoscroll, { passive: true, once: true });
      frame.addEventListener("keydown", (event) => {
        if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) {
          stopAutoscroll();
        }
      });

      if (image && !image.complete) {
        image.addEventListener("load", () => {
          syncPreviewSize();
          startRollout();
          startAutoscrollAfterRollout();
        }, { once: true });
      } else {
        syncPreviewSize();
        startRollout();
        startAutoscrollAfterRollout();
      }

      if ("ResizeObserver" in window) {
        const resizeObserver = new ResizeObserver(() => {
          syncPreviewSize();
          startAutoscroll();
        });
        resizeObserver.observe(frame);
        if (copy) {
          resizeObserver.observe(copy);
        }
        if (titleNote) {
          resizeObserver.observe(titleNote);
        }
        frame.lendiTitleScrollObserver = resizeObserver;
      }

      window.addEventListener("resize", syncPreviewSize);
    });
  }

  renderLendiGraph();
  initRiveAnimations();
  initLendiPdfPageStack();
  initCaseScreenMagnifiers();
  initBeforeAfterComparisons();
  initCaseVideoControls();
  initLendiTitleScrollPreview();
  initLendiStickerStack();
  initPortfolioSurvey();
  initVisitedCaseNotes();
  trackStoryEvent("story_page_viewed");

  document.querySelectorAll("[data-track]").forEach((element) => {
    element.addEventListener("click", () => {
      trackStoryEvent(element.dataset.track, {
        track_target: element.dataset.trackTarget || element.getAttribute("href") || "",
        track_location: element.dataset.trackLocation || "",
        case_target: element.dataset.caseTarget || ""
      });
    });
  });
})();
