import React from "react";
import { render, screen } from "@testing-library/react";
import { expect } from "@jest/globals";
import "@testing-library/jest-dom";
import UniversityList from "./UniversityList";
import fetchMock from "jest-fetch-mock";

describe("UniversityList component", () => {
  it("renders without crashing", () => {
    render(<UniversityList />);
    expect(screen.getByLabelText("Choose a country"));
  });
});
