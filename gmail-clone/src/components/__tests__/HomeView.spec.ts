import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import HomeView from "../../views/HomeView.vue";

describe("HomePage Works", () => {
  it("renders", () => {
    const wrapper = mount(HomeView);
    expect(wrapper.find("button").isVisible()).toBe(true);
  });
});
