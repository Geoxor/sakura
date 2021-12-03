import Discord from "discord.js";
import Waifu from "../../shaii/Waifu.shaii";
import { COMMON, LEGENDARY, MYTHICAL, RARE, UNCOMMON } from "../../shaii/WaifuRarities.shaii";
import WaifuBattle from "../../shaii/WaifuBattle.shaii";
import { defineCommand, IMessage } from "../../types";
import { chooseWaifu } from "../../logic/logic.shaii";

export default defineCommand({
  name: "battle",
  description: "Battle a random waifu with your friends for rewards!",
  requiresProcessing: false,
  execute: async (message) => {
    if (!(message.channel instanceof Discord.TextChannel)) return "Can't start battles in here!";
    const { chosenWaifu, chosenRarity } = chooseWaifu([COMMON, UNCOMMON, RARE, LEGENDARY, MYTHICAL]);

    const battle = new WaifuBattle(message.author, message.channel, new Waifu(chosenWaifu, chosenRarity));
    await battle.startBattle();
    return;
  },
});
