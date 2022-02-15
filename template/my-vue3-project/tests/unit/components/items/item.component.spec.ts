import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import ItemList from "@/components/items/children/item.vue";

import Item from "@/models/items/item.interface";

describe("ItemList.vue", () => {
  it("renders an Item correctly", () => {
    const model: Item = {
      id: 1,
      name: "Unit test Item 1",
      selected: false,
    };

    const wrapper = shallowMount(ItemList, {
      props: {
        model: model,
      },
    });

    // renders okay
    //expect(wrapper.text()).to.equal(model.name);

    // more specific tests
    const domEl = wrapper.find("div.name");
    expect(domEl.text()).to.equal(model.name);
  });

  it("has expected css class when selected is false", () => {
	const model: Item = {
	  id: 2,
	  name: "Unit test Item 2",
	  selected: false,
	}

	const wrapper = shallowMount(ItemList, {props:{model}});

	const classes = wrapper.classes();
	expect(classes).to.be.an("array").that.includes("item");
	expect(classes).to.be.an("array").that.does.not.includes("selected");

  });
  it('has selected css class when selected istrue', () => {

	// Selected manually for this test
	const model: Item = {
	  id: 3,
	  name: "Unit test Item 3",
	  selected: true,
	}

	const wrapper = shallowMount(ItemList, {props:{model}});
	const classes = wrapper.classes();

	expect(classes).to.be.an("array").that.includes("item");
	
	expect(classes).to.be.an("array").that.includes("selected");

  })
});
