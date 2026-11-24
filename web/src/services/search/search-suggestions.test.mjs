import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getSearchSuggestions } from "./search-suggestions.ts";
import { buildSearchUrl, isValidIndianPinCode } from "./search-url.ts";

const projects = [
  {
    name: "The Courtyard Residences",
    location: "Pune, Maharashtra",
    detail: "2 & 3 bedroom homes · Sample project",
  },
];

describe("getSearchSuggestions", () => {
  it("finds partial city and locality names", () => {
    assert.ok(
      getSearchSuggestions("gur").some(
        ({ category, label }) => category === "Cities" && label === "Gurugram",
      ),
    );
    assert.ok(
      getSearchSuggestions("sector 65 gur").some(
        ({ category, label }) =>
          category === "Localities" && label === "Sector 65 Gurugram",
      ),
    );
  });

  describe("buildSearchUrl", () => {
    it("preserves transaction mode, selected location and advanced filters", () => {
      for (const mode of [
        "Buy",
        "Rent",
        "New Projects",
        "PG & Co-living",
        "Commercial",
        "Plots",
      ]) {
        const url = new URL(
          buildSearchUrl({
            mode,
            query: "3 BHK apartment",
            suggestion:
              mode === "Buy"
                ? {
                    id: "city-Gurugram",
                    label: "Gurugram",
                    category: "Cities",
                    searchableText: "Gurugram Haryana",
                  }
                : null,
            values: {
              propertyType: "Apartment / Flat",
              minBudget: "5000000",
              maxBudget: "15000000",
              bedrooms: "3 BHK",
              gatedCommunity: "Yes",
            },
          }),
          "https://example.test",
        );

        assert.equal(
          url.searchParams.get("transaction"),
          mode.toLowerCase().replace(/[&\s]+/g, "-"),
        );
        assert.equal(url.searchParams.get("q"), "3 BHK apartment");
        assert.equal(url.searchParams.get("type"), "Apartment / Flat");
        assert.equal(url.searchParams.get("minBudget"), "5000000");
        assert.equal(url.searchParams.get("maxBudget"), "15000000");
        assert.equal(url.searchParams.get("bedrooms"), "3 BHK");
        assert.equal(url.searchParams.get("gatedCommunity"), "Yes");
        assert.equal(url.searchParams.get("city"), mode === "Buy" ? "gurugram" : null);
      }
    });

    it("preserves location and PIN code filters in the search URL", () => {
      const url = new URL(
        buildSearchUrl({
          mode: "Rent",
          query: "",
          values: { location: "Noida Sector 62", pinCode: "122002" },
        }),
        "https://example.test",
      );

      assert.equal(url.searchParams.get("location"), "Noida Sector 62");
      assert.equal(url.searchParams.get("pinCode"), "122002");
    });

    it("supports an empty search without adding empty filter parameters", () => {
      const url = new URL(
        buildSearchUrl({
          mode: "Buy",
          query: "",
          values: {},
        }),
        "https://example.test",
      );

      assert.equal(url.searchParams.get("transaction"), "buy");
      assert.equal(url.searchParams.get("q"), null);
      assert.equal(url.searchParams.has("budget"), false);
    });

    describe("isValidIndianPinCode", () => {
      it("accepts exactly six digits and rejects other input", () => {
        assert.equal(isValidIndianPinCode("122002"), true);
        assert.equal(isValidIndianPinCode("12200"), false);
        assert.equal(isValidIndianPinCode("1220021"), false);
        assert.equal(isValidIndianPinCode("12A002"), false);
      });
    });
  });

  it("matches project names and searchable project details", () => {
    const suggestions = getSearchSuggestions("courtyard", projects);
    assert.equal(suggestions[0]?.category, "Projects");
    assert.equal(suggestions[0]?.label, "The Courtyard Residences");
    const locationMatch = getSearchSuggestions("Pune Sample project", projects)
      .find(({ category }) => category === "Projects");
    assert.match(locationMatch?.detail ?? "", /Pune/);
  });

  it("matches natural-language property searches", () => {
    for (const query of [
      "3 BHK apartment in Gurugram under 1.5 crore",
      "3 BHK flat in Noida under 1.5 crore",
      "Villa near Golf Course Road",
      "Office space for rent in Bengaluru",
      "Warehouse in Mumbai",
      "Residential plot in Pune",
    ]) {
      assert.ok(
        getSearchSuggestions(query).some(
          ({ category }) => category === "Property Searches",
        ),
        `Expected suggestions for "${query}"`,
      );
    }
  });

  it("groups matching property types separately from searches", () => {
    assert.ok(
      getSearchSuggestions("warehouse", [], ["Warehouse"]).some(
        ({ category, label }) =>
          category === "Property Types" && label === "Warehouse",
      ),
    );
  });

  it("returns no fabricated match for an unknown query", () => {
    assert.deepEqual(getSearchSuggestions("xyznotarealplace"), []);
    assert.deepEqual(getSearchSuggestions(""), []);
  });
});
