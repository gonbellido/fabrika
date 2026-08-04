import { registerComponent } from "./registry";
import { ProductCardRenderer } from "./ProductCard";
import {
  SectionRenderer,
  HeadingRenderer,
  TextRenderer,
  ButtonRenderer,
  ImageRenderer,
  HeaderRenderer,
  FooterRenderer,
} from "./Section";

export function initComponents() {
  registerComponent("ProductCard", ProductCardRenderer);
  registerComponent("Section", SectionRenderer);
  registerComponent("Heading", HeadingRenderer);
  registerComponent("Text", TextRenderer);
  registerComponent("Button", ButtonRenderer);
  registerComponent("Image", ImageRenderer);
  registerComponent("Header", HeaderRenderer);
  registerComponent("Footer", FooterRenderer);
}
