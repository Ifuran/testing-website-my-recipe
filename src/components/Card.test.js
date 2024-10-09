import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Card from "./Card";

const el = {
  image: "https://via.placeholder.com/150",
  name: "Test Recipe",
  rating: 4.5,
  tags: ["Tag1", "Tag2", "Tag3"],
  id: 1,
};

test("renders the component Card & given props", () => {
  render(<Card el={el} />);

  // image test
  const img = screen.getByTestId(`img-recipe-${el.id}`);
  expect(img).toHaveAttribute("alt", el.name);
  expect(img).toHaveAttribute("src", el.image);

  // title card test
  const title = screen.getByTestId(`title-recipe-${el.id}`);
  expect(title).toBeInTheDocument();
  expect(title).toHaveTextContent(el.name);

  // rating recipe test --> <p>
  const rating_text = screen.getByTestId(`rating-recipe-${el.id}`);
  expect(rating_text).toBeInTheDocument();
  expect(rating_text).toHaveTextContent(el.rating);

  // tags (list-item) test <li>
  for (let i = 0; i < el.tags.length - 1; i++) {
    const tag = screen.getByTestId(`tag-recipe-${el.tags[i]}`);
    expect(tag).toBeInTheDocument();
    expect(tag).toHaveTextContent(el.tags[i]);
  }

  // a href test
  const a = screen.getByTestId(`link-recipe-${el.id}`);
  expect(a).toHaveAttribute("href", `https://dummyjson.com/recipes/${el.id}`);
});
