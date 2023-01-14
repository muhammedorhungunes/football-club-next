import { Disclosure } from "@headlessui/react";
import { ArrowLongUpIcon, ArrowLongDownIcon } from "@heroicons/react/20/solid";

const filters = [
  {
    id: "cardType",
    name: "Card Type",
    options: [
      { value: "gold", label: "Gold", checked: false },
      { value: "silver", label: "Silver", checked: false },
      { value: "bronze", label: "Bronze", checked: true },
    ],
  },
  {
    id: "position",
    name: "Position",
    options: [
      { value: "goalkeeper", label: "Goalkeeper", checked: false },
      { value: "defender", label: "Defender", checked: false },
      { value: "midfielder", label: "Midfielder", checked: true },
      { value: "forward", label: "Forward", checked: false },
    ],
  },
  {
    id: "price",
    name: "Price",
    options: [{ value: "26" }],
  },
];

export default function Filter() {
  return (
    <form className="hidden lg:block rounded-lg">
      <h3 className="sr-only">Categories</h3>
      {filters.map((section) =>
        section.id === "price" ? (
          <Disclosure
            as="div"
            key={section.id}
            className="border-b border-gray-200 py-6 bg-white rounded-lg"
          >
            {({ open }) => (
              <>
                <h3 className="-my-3 flow-root">
                  <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                    <span className="font-medium text-gray-900 ml-8">
                      {section.name}
                    </span>
                    <span className="flex items-center mr-8">
                      {open ? (
                        <ArrowLongUpIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      ) : (
                        <ArrowLongDownIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      )}
                    </span>
                  </Disclosure.Button>
                </h3>
                <Disclosure.Panel className="pt-6">
                  <div className="space-y-4">
                    <label
                      for="default-range"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Default range
                    </label>
                    <input
                      id="default-range"
                      type="range"
                      value="50"
                      class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    />
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ) : (
          <Disclosure
            as="div"
            key={section.id}
            className="border-b border-gray-200 py-6 bg-white rounded-lg"
          >
            {({ open }) => (
              <>
                <h3 className="-my-3 flow-root">
                  <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                    <span className="font-medium text-gray-900 ml-8">
                      {section.name}
                    </span>
                    <span className="flex items-center mr-8">
                      {open ? (
                        <ArrowLongUpIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      ) : (
                        <ArrowLongDownIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      )}
                    </span>
                  </Disclosure.Button>
                </h3>
                <Disclosure.Panel className="pt-6">
                  <div className="space-y-4">
                    {section.options.map((option, optionIdx) => (
                      <div
                        key={option.value}
                        className="flex items-center ml-8"
                      >
                        <input
                          id={`filter-${section.id}-${optionIdx}`}
                          name={`${section.id}[]`}
                          defaultValue={option.value}
                          type="checkbox"
                          defaultChecked={option.checked}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                          htmlFor={`filter-${section.id}-${optionIdx}`}
                          className="ml-3 text-sm text-gray-600"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        )
      )}
    </form>
  );
}
