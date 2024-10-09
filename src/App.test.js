import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

test("renders App component with NavBar, image banner, and Footer", async () => {
  render(<App />);

  // image banner is rendered
  const banner = screen.getByTestId("image-banner");
  expect(banner).toBeInTheDocument();
  expect(banner).toHaveProperty(
    "src",
    "https://www.instacart.com/company/wp-content/uploads/2022/11/cooking-statistics-hero.jpg"
  );
  expect(banner).toHaveProperty("alt", "banner");

  // await for fetching proccess complete
  const recipe = await waitFor(
    () => screen.findByText(/Classic Margherita Pizza/),
    { timeout: 10000 }
  );
  expect(recipe).toBeInTheDocument();

  // navbar title test
  const title = screen.getByTestId("my-recipe");
  expect(title).toBeInTheDocument();
  expect(title).toHaveTextContent(/My Recipe/i);

  // navbar form search test
  const searchInput = screen.getByPlaceholderText("Recipe Name");
  const form = screen.getByTestId("form-search");
  fireEvent.change(searchInput, { target: { value: "Pizza" } });
  expect(searchInput.value).toBe("Pizza"); // Cek value dari input setelah event change
  fireEvent.submit(form);

  // footer test test
  const copyright = screen.getByTestId("footer-text");
  expect(copyright).toBeInTheDocument();
  expect(copyright).toHaveTextContent(
    "© 2024 Company, Inc. All rights reserved."
  );

  // link facebook test
  const link_fb = screen.getByTestId(`link-facebook`);
  expect(link_fb).toHaveAttribute("href", "https://facebook.com");
  // link x test
  const link_x = screen.getByTestId(`link-x`);
  expect(link_x).toHaveAttribute("href", "https://x.com");
  // link instagram test
  const link_ig = screen.getByTestId(`link-instagram`);
  expect(link_ig).toHaveAttribute("href", "https://instagram.com/");
});
