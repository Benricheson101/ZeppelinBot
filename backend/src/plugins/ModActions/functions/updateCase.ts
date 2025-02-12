import { Message } from "discord.js";
import { CaseTypes } from "../../../data/CaseTypes";
import { Case } from "../../../data/entities/Case";
import { sendErrorMessage, sendSuccessMessage } from "../../../pluginUtils";
import { CasesPlugin } from "../../../plugins/Cases/CasesPlugin";
import { LogsPlugin } from "../../Logs/LogsPlugin";
import { formatReasonWithAttachments } from "./formatReasonWithAttachments";
import { parseReason } from "./parseReason.js";
import { GuildPluginData } from "knub";
import { ModActionsPluginType } from "../types.js";

export async function updateCase(pluginData: GuildPluginData<ModActionsPluginType>, msg: Message, args) {
  let theCase: Case | undefined;
  if (args.caseNumber != null) {
    theCase = (await pluginData.state.cases.findByCaseNumber(args.caseNumber)) || undefined;
  } else {
    theCase = (await pluginData.state.cases.findLatestByModId(msg.author.id)) || undefined;
  }

  if (!theCase) {
    sendErrorMessage(pluginData, msg.channel, "Case not found");
    return;
  }

  if (!args.note && msg.attachments.size === 0) {
    sendErrorMessage(pluginData, msg.channel, "Text or attachment required");
    return;
  }
  const config = pluginData.config.get();
  args.note &&= parseReason(config, args.note);

  const note = formatReasonWithAttachments(args.note, [...msg.attachments.values()]);

  const casesPlugin = pluginData.getPlugin(CasesPlugin);
  await casesPlugin.createCaseNote({
    caseId: theCase.id,
    modId: msg.author.id,
    body: note,
  });

  pluginData.getPlugin(LogsPlugin).logCaseUpdate({
    mod: msg.author,
    caseNumber: theCase.case_number,
    caseType: CaseTypes[theCase.type],
    note,
  });

  sendSuccessMessage(pluginData, msg.channel, `Case \`#${theCase.case_number}\` updated`);
}
