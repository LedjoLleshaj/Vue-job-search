import { shallowMount } from "@vue/test-utils";

import MainNav from "@/components/Navigation/MainNav";

describe("MainNav", () => {
  it("displays company name", async () => {
    const wrapper = shallowMount(MainNav); //returns a object that is a wrapper around MainNav
    await wrapper.setData({
      company: "Job Search LTD",
    });
    expect(wrapper.text()).toMatch("Job Search LTD");
  });
  it("displayes menu items for navigation", () => {
    const wrapper = shallowMount(MainNav);
    //wrapper.find finds the first element "li"
    //findAll fidn al the elements "li"
    const navigationMenuItem = wrapper.findAll(
      "[data-test='main-nav-list-item']"
    );
    const navigationMenuText = navigationMenuItem.map((item) => item.text());
    expect(navigationMenuText).toEqual([
      "Teams",
      "Locations",
      "Life at Job Search LTD",
      "How we hire",
      "Students",
      "Jobs",
    ]);
    console.log(navigationMenuText);
  });

  describe("when user is logged out", () => {
    it("prompts user to sign in", () => {
      const wrapper = shallowMount(MainNav);
      const loginButton = wrapper.find("[data-test='login-button']");
      expect(loginButton.exists()).toBe(true);
    });
  });

  describe("when user is logged in", () => {
    it("displays user profile image instead", async () => {
      const wrapper = shallowMount(MainNav);
      let profileImage = wrapper.find("[data-test='profile-image']");
      expect(profileImage.exists()).toBe(false);

      const loginButton = wrapper.find("[data-test='login-button']");
      await loginButton.trigger("click");

      profileImage = wrapper.find("[data-test='profile-image']");
      expect(profileImage.exists()).toBe(true);
    });
    it("displays subnavigation menu with additional info", async () => {
      const wrapper = shallowMount(MainNav);
      let subnav = wrapper.find("[data-test='subnav']");
      expect(subnav.exists()).toBe(false);

      const loginButton = wrapper.find("[data-test='login-button']");
      await loginButton.trigger("click");

      subnav = wrapper.find("[data-test='subnav']");
      expect(subnav.exists()).toBe(true);
    });
  });
});