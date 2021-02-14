import { JsonProperty, Serializable } from "typescript-json-serializer";
import { GemSocketColor } from "./item";
import { ItemStats } from "./item-stats";

@Serializable()
export class Gem {
  @JsonProperty() _id: string;
  @JsonProperty() id: number;
  @JsonProperty() name: string;
  @JsonProperty() color: GemColor;
  @JsonProperty() stats: ItemStats
  @JsonProperty() quality: GemQuality

  constructor(id: number, name: string, color: GemColor, quality: GemQuality, stats: ItemStats) {
    this.id = id;
    this._id = name;
    this.name = name;
    this.color = color;
    this.stats = stats;
    this.quality = quality;
  }
}


export enum GemColor {
  red = 'red',
  yellow = 'yellow',
  green = 'green',
  blue = 'blue',
  purple = 'purple',
  orange = 'orange',
  meta = 'meta'
}

export enum GemQuality {
  common = 'common',
  uncommon = 'uncommon',
  rare = 'rare',
  epic = 'epic'
}
