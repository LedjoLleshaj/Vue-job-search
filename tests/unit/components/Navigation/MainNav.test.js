import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import { createStore } from "vuex";

import MainNav from "@/components/Navigation/MainNav";

describe("MainNav", () => {
  const createConfig = (store) => ({
    global: {
      plugins: [store],
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
  });

  it("displays company name", () => {
    const store = createStore();

    const wrapper = shallowMount(MainNav, createConfig(store));
    expect(wrapper.text()).toMatch("Job Search LTD");
  });
  it("displayes menu items for navigation", () => {
    const store = createStore();

    const wrapper = shallowMount(MainNav, createConfig(store));
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
      const store = createStore();

      const wrapper = shallowMount(MainNav, createConfig(store));
      const loginButton = wrapper.find("[data-test='login-button']");
      expect(loginButton.exists()).toBe(true);
    });
  });

  describe("when user is logged in", () => {
    it("displays user profile image instead", () => {
      const store = createStore({
        state() {
          return {
            isLoggedIn: true,
          };
        },
      });
      const wrapper = shallowMount(MainNav, createConfig(store));

      const profileImage = wrapper.find("[data-test='profile-image']");
      expect(profileImage.exists()).toBe(true);
    });
    it("displays subnavigation menu with additional info", () => {
      const store = createStore({
        state() {
          return {
            isLoggedIn: true,
          };
        },
      });
      const wrapper = shallowMount(MainNav, createConfig(store));

      const subnav = wrapper.find("[data-test='subnav']");
      expect(subnav.exists()).toBe(true);
    });
  });
  describe("when user is logged out", () => {
    it("issues call to Vuex to login user", async () => {
      const store = createStore();
      const commit = jest.fn();
      store.commit = commit;

      const wrapper = shallowMount(MainNav, createConfig(store));
      const loginButton = wrapper.find("[data-test='login-button']");
      await loginButton.trigger("click");
      expect(commit).toHaveBeenCalledWith("LOGIN_USER");
    });
  });
});
