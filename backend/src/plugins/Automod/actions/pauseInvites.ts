import * as t from "io-ts";
import { automodAction } from "../helpers";

export const PauseInvitesAction = automodAction({
  configType: t.boolean,
  defaultConfig: true,

  async apply({ pluginData, actionConfig }) {
    await pluginData.guild.disableInvites(actionConfig);
  },
});
