import Vuex, { Store } from "vuex";
import { State } from "../../src/store/state";
import { createLocalVue, Wrapper } from "@vue/test-utils";
import { Vue } from "vue/types/vue";
import { isEqual } from "lodash";
import testConfiguration from "./test-configuration";

export type MockRouter = {
  push: Function;
  go: Function;
  replace: Function;
};


export type RemountFn = (store?: Store<State>) => void;
export type RemountWithMethods = (methods?: Record<string, Function>) => void;

export const createMockStore = (config: any) => new Vuex.Store<State>(config);

export const createMockRouter = () => ({ push: jest.fn(), go: jest.fn(), replace: jest.fn() });

type VueTestFixture = {
  mockRouter: MockRouter;
  testConfig: any;
  mockStore: Store<State>;
  localVue: typeof Vue;
};

export const createVueTestFixture: (configSetupFn?: (testConfig: any) => void) => VueTestFixture = (
  configSetupFn = () => { }
) => {
  const localVue: typeof Vue = createLocalVue();
  localVue.use(Vuex);
  const mockRouter: MockRouter = createMockRouter();
  const testConfig = testConfiguration();
  configSetupFn(testConfig);
  const mockStore: Store<State> = createMockStore(testConfig);
  return { mockRouter, testConfig, mockStore, localVue };
};

/**
* Create a list of numbers up to n
*
* e.g. rangeOf(5) => [1,2,3,4,5], rangeOf(3) => [1,2,3]
* Useful for creating a range to loop over test fixture objects
*
* @param n - the number of sequential values to generate in an array
*/
export const rangeOf: (n: number) => number[] = (n) => [...Array(n).keys()];

export type CommonPageFunctions = {
  answerDropDownQuestion: (questionDataId: string, optionIndex: number) => void;
 // answerTextQuestion: (questionDataId: string, answer: string | boolean) => void;
  answerRadioQuestion: (questionDataId: string, answer: string | boolean) => void;
  clickOnCheckbox: (dataTag: string) => void;
  clickOnNextButton: () => void;
  clickOnBackButton: () => void;
  getFieldValue: (dataTagName: string) => any;
  getRadioValueOf: (questionDataId: string) => any;
  getTextOf: (dataTagName: string) => string;
  getErrorText: (dataTagName: string) => string;
  isNextButtonEnabled: () => boolean;
  typeInField: (dataTagName: string, text: string) => void;
  waitForUpdate: () => void;
  waitForPromisesToResolve: (numberOfPromises: number) => void;
  hasNavigatedTo: () => string | null;
  hasNavigatedToWithParams: () => any;
  backButtonHasNavigatedTo: () => number;
  hasUpdatedStateWith: (stateFn: any, expectedCallParameters: any, atParamIndex?: number) => boolean;
};

export const createCommonPageFunctions = (
  wrapper: Wrapper<Vue>,
  router: MockRouter = createMockRouter()
): CommonPageFunctions => ({
  answerDropDownQuestion: (questionDataId: string, optionIndex: number) => {
    wrapper.find(`[${questionDataId}] [data-toggle-dropdown]`).trigger("click");
    const list = wrapper.findAll(".list li");
    list.at(optionIndex).trigger("click");
  },
  // answerTextQuestion: (questionDataId: string, answer: string | boolean) => {
  //   console.log(wrapper)
  //   wrapper.find(`[${questionDataId}] input`).setValue(answer)
  //
  // },
  answerRadioQuestion: (questionDataId: string, answer: string | boolean) =>
    wrapper.find(`[${questionDataId}] input[value=${answer}]`).trigger("click"),
  clickOnCheckbox: (dataTag: string): void => {
    wrapper.find(`[${dataTag}] input`).trigger("click");
  },
  clickOnNextButton: () => wrapper.find("[data-next]").trigger("click"),
  clickOnBackButton: () => wrapper.find("[data-back]").trigger("click"),
  getFieldValue: (dataTagName: string) => (wrapper.find(`[${dataTagName}] input`).element as any).value,
  getRadioValueOf: (questionDataId: string) => wrapper.find(`[${questionDataId}] input:checked`).attributes("value"),
  getTextOf: (dataId: string) => wrapper.find(`[${dataId}]`).text(),
  getErrorText: (dataTagName: string) => wrapper.find(`[${dataTagName}] .error`).text(),
  isNextButtonEnabled: () => wrapper.find("[data-next]").attributes("disabled") === undefined,
  typeInField: async (dataTagName: string, value: string) =>
    await wrapper.find(`[${dataTagName}] input`).setValue(value),
  waitForUpdate: async () => await wrapper.vm.$nextTick(),
  waitForPromisesToResolve: async (numberOfPromises: number) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const item of rangeOf(numberOfPromises)) {
      await wrapper.vm.$nextTick();
    }
  },
  hasNavigatedTo: () => {
    const routerCalls = (router.push as any).mock.calls;
    return routerCalls.length > 0 ? (router.push as any).mock.calls[0][0] : null;
  },
  hasNavigatedToWithParams: () => {
    const routerCalls = (router.push as any).mock.calls;
    return routerCalls.length > 0 ? routerCalls[0][0] : {};
  },
  backButtonHasNavigatedTo: () => (router.go as any).mock.calls[0][0],
  hasUpdatedStateWith: (stateFn: any, params: any, atParamIndex = 1) => {
    console.log((stateFn as any).mock.calls.length)
    const hasBeenCalled = (stateFn as any).mock.calls.length > 0;

    if (!hasBeenCalled) {
      return false;
    }
    const callParams = (stateFn as any).mock.calls[0][atParamIndex];
    const unwrappedCalledParams = JSON.parse(JSON.stringify(callParams));
    const unwrappedParams = JSON.parse(JSON.stringify(params));
    // const unwrappedParams =    [
    //   {
    //     title: 'Razzle Dazzle',
    //     description: 'THE GOOD STUFF',
    //     stock: '67'
    //   }
    // ]

    console.log(unwrappedCalledParams)
    console.log( unwrappedParams)
    console.log(isEqual(unwrappedCalledParams, unwrappedParams))
    return isEqual(unwrappedCalledParams, unwrappedParams);
  }
});