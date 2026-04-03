import { Floor } from "./Floor";
import { Walls } from "./Walls";
import { WindowFrame } from "./WindowFrame";
import { Desk } from "./Desk";
import { DisplayShelf } from "./DisplayShelf";
import { ToolBoard } from "./ToolBoard";
import { Mailbox } from "./Mailbox";

export function Room() {
  return (
    <group>
      <Floor />
      <Walls />
      <WindowFrame />
      <Desk />
      <DisplayShelf />
      <ToolBoard />
      <Mailbox />
    </group>
  );
}
