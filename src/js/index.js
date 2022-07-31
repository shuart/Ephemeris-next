import createStateManager from "./modules/common_state/state_manager.js";
import common_ui from "./modules/common_ui/ui.js";

const state_manager = createStateManager({mainUiElement:common_ui})
common_ui.mount()