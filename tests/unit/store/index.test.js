import { actions, getters, mutations, state } from "@/store";
import getJobs from "@/api/getJobs";
jest.mock("@/api/getJobs");

describe("state", () => {
  it("keeps track of whether user is logged in", () => {
    const startingState = state();
    expect(startingState.isLoggedIn).toBe(false);
  });

  it("Stores job listings", () => {
    const startingState = state();
    expect(startingState.jobs).toEqual([]);
  });
});

describe("mutations", () => {
  describe("LOGIN_USER", () => {
    it("logs the user in", () => {
      const state = { isLoggedIn: false };
      mutations.LOGIN_USER(state);
      expect(state).toEqual({ isLoggedIn: true });
    });
  });

  describe("RECEIVE_JOBS", () => {
    it("receives jobs from API response", () => {
      const state = { jobs: [] };
      mutations.RECEIVE_JOBS(state, [
        {
          id: 1,
          title: "Java Engineer",
        },
      ]);
      expect(state).toEqual({ jobs: [{ id: 1, title: "Java Engineer" }] });
    });
  });
});

describe("getters", () => {
  describe("UNIQUE_ORGANIZATIONS", () => {
    it("find unique organizations from list of jobs", () => {
      const state = {
        jobs: [
          { organization: "Google" },
          { organization: "Amazon" },
          { organization: "Google" },
        ],
      };
      const result = getters.UNIQUE_ORGANIZATIONS(state);
      expect(result).toEqual(new Set(["Google", "Amazon"]));
    });
  });
});

describe("actions", () => {
  describe("FETCH_JOBS", () => {
    beforeEach(() => {
      getJobs.mockResolvedValue([
        {
          id: 1,
          title: "Software Developer",
        },
      ]);
    });

    it("makes request to fetch jobs", async () => {
      const context = { commit: jest.fn() };
      await actions.FETCH_JOBS({ commit: context.commit });
      expect(getJobs).toHaveBeenCalled();
    });

    it("send message to save received jobs in store", async () => {
      const commit = jest.fn();
      const context = { commit };
      await actions.FETCH_JOBS({ commit: context.commit });
      expect(commit).toHaveBeenCalledWith("RECEIVE_JOBS", [
        {
          id: 1,
          title: "Software Developer",
        },
      ]);
    });
  });
});
