import { JsonProperty, serialize } from "typescript-json-serializer";
import { GemSocketColor } from "./item/item";
import { Gem } from "./item/gem";


@serialize
export class GemSocket {
  @JsonProperty() color: GemSocketColor;
  @JsonProperty() gem: Gem | null

  constructor(color: GemSocketColor) {
    this.color = color;
    this.gem = null;
  }
}
