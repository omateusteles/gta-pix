export function addChatMessage(message: string) {
    emit("chat:addMessage", {
        color: [255, 255, 255],
        multiline: true,
        args: [message]
    });
}