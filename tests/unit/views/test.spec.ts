describe("MedSupQuote", () => {
    it("Provides dropdown options for the next 3 months", () => {
      const mockCurrentDate = new Date(2019, 10, 1);
      const page = MedSupQuotePage({ currentDate: mockCurrentDate });
      expect(page.dropdownOptionsListFor("data-desired-coverage-start-date")).toEqual([
        "December 2019",
        "January 2020",
        "February 2020"
      ]);
    });
  
    describe("when form is not filled", () => {
      it("does not make a call to check oep, get med sup quotes, or redirect to the plans page", () => {
        const page = MedSupQuotePage();
        page.clickOnNextButton();
        expect(page.hasNavigatedTo()).toBeNull();
        expect(page.hasUpdatedCheckOep()).toBeFalsy();
        expect(page.hasFetchedMedSupQuotes()).toBeFalsy();
      });
    });
  
    describe("when form is filled correctly", () => {
      it("should save the data into state", async () => {
        const mockCurrentDate = new Date(2019, 10, 1);
        const page = MedSupQuotePage({ currentDate: mockCurrentDate });
        page.answerTextQuestion("data-part-a-date", "10-01-2019");
        page.answerTextQuestion("data-part-b-date", "10-01-2019");
        page.answerRadioQuestion("data-sex", "m");
        page.answerDropDownQuestion("data-desired-coverage-start-date", 0);
        page.answerTextQuestion("data-date-of-birth", "01-01-1950");
        page.answerRadioQuestion("data-tobacco-question", true);
        page.clickOnNextButton();
        await page.waitForUpdate();
        expect(
          page.hasUpdatedEnrollmentDataWith({
            effectiveDate: "2019-12-01",
            applicant: {
              date_of_birth: "01-01-1950",
              sex: "m",
              partAMonth: "10",
              partAYear: "2019",
              partBMonth: "10",
              partBYear: "2019",
              isSmoker: true
            }
          })
        ).toBeTruthy();
      });
  
      describe("when a successful response is returned", () => {
        it("should bring the user into the medicare supplement plans page", async () => {
          const mockCurrentDate = new Date(2019, 10, 1);
          const page = MedSupQuotePage({ currentDate: mockCurrentDate });
          page.answerTextQuestion("data-part-a-date", "10-01-2019");
          page.answerTextQuestion("data-part-b-date", "10-01-2019");
          page.answerRadioQuestion("data-sex", "m");
          page.answerDropDownQuestion("data-desired-coverage-start-date", 0);
          page.answerTextQuestion("data-date-of-birth", "01-01-1950");
          page.answerRadioQuestion("data-tobacco-question", true);
          page.clickOnNextButton();
          await page.waitForUpdate();
          await page.waitForUpdate();
          expect(page.hasNavigatedTo()).toEqual("/medicare-supplement/plans");
        });
  
        it("should make a request to check if the user is in OEP", async () => {
          const mockCurrentDate = new Date(2019, 10, 1);
          const page = MedSupQuotePage({ currentDate: mockCurrentDate });
          page.answerTextQuestion("data-part-a-date", "10-01-2019");
          page.answerTextQuestion("data-part-b-date", "10-01-2019");
          page.answerRadioQuestion("data-sex", "m");
          page.answerDropDownQuestion("data-desired-coverage-start-date", 0);
          page.answerTextQuestion("data-date-of-birth", "01-01-1950");
          page.answerRadioQuestion("data-tobacco-question", true);
          page.clickOnNextButton();
          await page.waitForUpdate();
          expect(
            page.hasCalledCheckOepWith({
              effectiveDate: "2019-12-01",
              partBDate: "2019-10-01",
              dob: "1950-01-01",
              state: "IN"
            })
          ).toBeTruthy();
        });
  
        it("should make a request to fetch coverage questions", async () => {
          const mockCurrentDate = new Date(2019, 10, 1);
          const page = MedSupQuotePage({ currentDate: mockCurrentDate });
          page.answerTextQuestion("data-part-a-date", "10-01-2019");
          page.answerTextQuestion("data-part-b-date", "10-01-2019");
          page.answerRadioQuestion("data-sex", "m");
          page.answerDropDownQuestion("data-desired-coverage-start-date", 0);
          page.answerTextQuestion("data-date-of-birth", "01-01-1950");
          page.answerRadioQuestion("data-tobacco-question", true);
          page.clickOnNextButton();
          await page.waitForUpdate();
          expect(
            page.hasCalledMedSupCoverageQuestionWith({
              effectiveDate: "2019-12-01",
              partBDate: "2019-10-01",
              dateOfBirth: "1950-01-01",
              fipsCode: "18081"
            })
          ).toBeTruthy();
        });
  
        it("should make a request to get med sup quotes", async () => {
          const mockCurrentDate = new Date(2019, 10, 1);
          const page = MedSupQuotePage({ currentDate: mockCurrentDate });
          page.answerTextQuestion("data-part-a-date", "10-01-2019");
          page.answerTextQuestion("data-part-b-date", "10-01-2019");
          page.answerRadioQuestion("data-sex", "m");
          page.answerDropDownQuestion("data-desired-coverage-start-date", 0);
          page.answerTextQuestion("data-date-of-birth", "01-01-1950");
          page.answerRadioQuestion("data-tobacco-question", true);
          page.clickOnNextButton();
          await page.waitForUpdate();
          expect(
            page.hasCalledGetMedSupQuotesWith({
              zipCode: "47150",
              fipsCode: "18081",
              effectiveDate: "2019-12-01",
              partBDate: "2019-10-01",
              gender: "m",
              dob: "1950-01-01",
              isSmoker: true,
              isInOep: true
            })
          ).toBeTruthy();
        });
      });
  
      describe("when an error response is returned", () => {
        describe("submit button is clicked", () => {
          it("should show the user an error, send a analytics event when getMedSupQuote fails, and NOT route deb to the next page", async () => {
            const getMedSupQuotes = jest.fn().mockRejectedValue(new Error("some error"));
            const page = MedSupQuotePage({ getMedSupQuotes });
            page.answerTextQuestion("data-part-a-date", "10-01-2019");
            page.answerTextQuestion("data-part-b-date", "10-01-2019");
            page.answerRadioQuestion("data-sex", "m");
            page.answerDropDownQuestion("data-desired-coverage-start-date", 0);
            page.answerTextQuestion("data-date-of-birth", "01-01-1950");
            page.answerRadioQuestion("data-tobacco-question", true);
            page.clickOnNextButton();
            await page.waitForPromisesToResolve(2);
            expect(page.getMedSupQuoteErrorText()).toEqual(
              "Unfortunately, there are no available plans. Please try again."
            );
            expect(page.hasCalledGetMedSupQuotesErrorAnalyticsEvent()).toBeTruthy();
            expect(page.hasNavigatedTo()).toBeNull();
          });
  
          it("should send an analytics event when checkOEP fails, and route deb to the plans page", async () => {
            const checkOep = jest.fn().mockRejectedValue(new Error("500 error"));
            const page = MedSupQuotePage({ checkOep });
            page.answerTextQuestion("data-part-a-date", "10-01-2019");
            page.answerTextQuestion("data-part-b-date", "10-01-2019");
            page.answerRadioQuestion("data-sex", "m");
            page.answerDropDownQuestion("data-desired-coverage-start-date", 0);
            page.answerTextQuestion("data-date-of-birth", "01-01-1950");
            page.answerRadioQuestion("data-tobacco-question", true);
            page.clickOnNextButton();
            await page.waitForUpdate();
            expect(page.hasCalledCheckOepErrorAnalyticsEvent()).toBeTruthy();
            expect(page.hasNavigatedTo()).toEqual("/medicare-supplement/plans");
          });
        });
      });
    });
  
    describe("when Deb fills out form and Effective date is before Part B date", () => {
      it("should not save the data into state and navigates to the boot page", async () => {
        const effectiveDateInThePast = new Date(2019, 10, 1);
        const page = MedSupQuotePage({ currentDate: effectiveDateInThePast });
        page.typeInField("data-part-a-date", "01-01-2020");
        page.typeInField("data-part-b-date", "01-01-2020");
        page.answerRadioQuestion("data-sex", "m");
        page.answerDropDownQuestion("data-desired-coverage-start-date", 0);
        page.typeInField("data-date-of-birth", "01-01-1950");
        page.answerRadioQuestion("data-tobacco-question", true);
  
        page.clickOnNextButton();
        await page.waitForUpdate();
        expect(page.hasNavigatedTo()).toEqual("/medicare-supplement/medicare-supplement-call-agent");
      });
    });
  
    describe("when Deb is not in OEP", () => {
      it("should route deb to the boot page", async () => {
        const mockCurrentDate = new Date(2019, 10, 1);
        const page = MedSupQuotePage({ checkOEPValue: false, currentDate: mockCurrentDate });
  
        page.answerTextQuestion("data-part-a-date", "10-01-2019");
        page.answerTextQuestion("data-part-b-date", "10-01-2019");
        page.answerRadioQuestion("data-sex", "m");
        page.answerDropDownQuestion("data-desired-coverage-start-date", 0);
        page.answerTextQuestion("data-date-of-birth", "01-01-1950");
        page.answerRadioQuestion("data-tobacco-question", true);
        page.clickOnNextButton();
        await page.waitForUpdate();
        expect(page.hasNavigatedTo()).toEqual("/medicare-supplement/medicare-supplement-call-agent");
      });
    });
  
    describe("when skipping this step", () => {
      it("should get quotes for a default user, and navigate to plans page", async () => {
        const mockCurrentDate = new Date(2021, 1, 10);
        const expectedSelectedEffectiveDate = "2021-03-01";
        const expectedSelectedPartBDate = "2021-03-01";
        const expectedDateOfBirthOffsetFromCurrentDateBySixtyFiveYears = "1956-02-01";
  
        const page = MedSupQuotePage({ currentDate: mockCurrentDate });
        page.clickSkipThisStep();
        await page.waitForUpdate();
  
        expect(
          page.hasCalledGetMedSupQuotesWith({
            dob: expectedDateOfBirthOffsetFromCurrentDateBySixtyFiveYears,
            effectiveDate: expectedSelectedEffectiveDate,
            fipsCode: "18081",
            gender: "M",
            isInOep: true,
            isSmoker: false,
            partBDate: expectedSelectedPartBDate,
            zipCode: "47150"
          })
        ).toBeTruthy();
        expect(page.hasNavigatedTo()).toEqual("/medicare-supplement/plans");
      });
    });
  
    describe("When deb returns to this page", () => {
      describe("after filling out the information", () => {
        it("The form is prefilled with information", async () => {
          const mockCurrentDate = new Date(2019, 10, 1);
          const applicant: Applicant = {
            ...MedSupFixtures.applicantFixture,
            date_of_birth: "01-01-1950",
            sex: "m",
            partAMonth: "10",
            partAYear: "2019",
            partBMonth: "10",
            partBYear: "2019",
            isSmoker: false
          };
          const page = MedSupQuotePage({
            effectiveDate: "2019-12-01",
            applicant,
            currentDate: mockCurrentDate
          });
          await page.waitForUpdate();
          expect(page.getFieldValue("data-desired-coverage-start-date")).toEqual("December 2019");
          expect(page.getFieldValue("data-part-a-date")).toEqual("10-01-2019");
          expect(page.getFieldValue("data-part-b-date")).toEqual("10-01-2019");
          expect(page.getRadioValueOf("data-tobacco-question")).toEqual("false");
          expect(page.getFieldValue("data-date-of-birth")).toEqual("01-01-1950");
          expect(page.getFieldValue("data-sex")).toEqual("m");
        });
      });
    });
  });
  
  type MedSupQuotePageInput = {
    getMedSupQuotes?: jest.Mock;
    currentDate?: Date;
    effectiveDate?: string;
    applicant?: Applicant;
    checkOep?: jest.Mock;
    checkOEPValue?: boolean;
  };
  
  const MedSupQuotePage = (input?: MedSupQuotePageInput) => {
    const { localVue, mockRouter, mockStore, testConfig, mockAnalytics } = createVueTestFixture((testConfig) => {
      testConfig.actions.getMedSupQuotes = input?.getMedSupQuotes || jest.fn();
      testConfig.actions.checkOep =
        input?.checkOep || jest.fn().mockResolvedValue({ isInOep: input?.checkOEPValue ?? true });
      testConfig.actions.getMedSupCoverageQuestions = jest.fn().mockResolvedValue([
        {
          id: 1,
          text: "TEXT",
          type: "LABEL",
          contentCode: "CONTENTCODE",
          acceptedAnswers: ["YES", "NO"]
        },
        {
          id: 2,
          text: "TEXT",
          type: "LABEL",
          contentCode: "CONTENTCODE2",
          acceptedAnswers: ["YES", "NO"]
        }
      ]);
      testConfig.actions.setEnrollmentData = jest.fn();
    });
  
    Date.now = jest.fn(() => (input?.currentDate || new Date()).valueOf());
    mockStore.state.enrollmentData.applicant = input?.applicant || mockStore.state.enrollmentData.applicant;
    mockStore.state.locationInfo = MedSupFixtures.locationInfoFixture;
    mockStore.state.enrollmentData.effectiveDate = input?.effectiveDate || mockStore.state.enrollmentData.effectiveDate;
  
    const wrapper: Wrapper<Vue> = mount(Quote, {
      localVue,
      store: mockStore,
      mocks: {
        $router: mockRouter,
        $analytics: mockAnalytics,
        $route: {
          name: "quote"
        }
      }
    });
  
    const commonFunctions = createCommonMedSupPageFunctions(wrapper, mockRouter);
    return {
      ...commonFunctions,
      dropdownOptionsListFor: (dataTagName: string) => {
        wrapper.find(`[${dataTagName}] [data-toggle-dropdown]`).trigger("click");
        return wrapper.findAll("li[data-dropdown-item]").wrappers.map((item) => item.text());
      },
      hasUpdatedCheckOep: () => (testConfig.actions.checkOep as any).mock.calls.length > 0,
      hasCalledCheckOepWith: (params: any) => commonFunctions.hasUpdatedStateWith(testConfig.actions.checkOep, params),
      hasFetchedMedSupQuotes: () => (testConfig.actions.getMedSupQuotes as any).mock.calls.length > 0,
      hasCalledGetMedSupQuotesWith: (params: any) =>
        commonFunctions.hasUpdatedStateWith(testConfig.actions.getMedSupQuotes, params),
      hasUpdatedEnrollmentData: () => (testConfig.actions.setEnrollmentData as any).mock.calls.length > 0,
      hasUpdatedEnrollmentDataWith: (params: any) =>
        commonFunctions.hasUpdatedStateWith(testConfig.actions.setEnrollmentData, params),
      getMedSupQuoteErrorText: () => wrapper.find("[data-error-message]").text(),
      hasCalledMedSupCoverageQuestionWith: (params: any) =>
        commonFunctions.hasUpdatedStateWith(testConfig.actions.getMedSupCoverageQuestions, params),
      hasCalledGetMedSupQuotesErrorAnalyticsEvent: () => {
        const [firstParam, secondParam, thirdParam] = (mockAnalytics.sendActionEvent as any).mock.calls[0];
        const unwrappedThirdParam = JSON.parse(JSON.stringify(thirdParam));
        const unwrappedEnrollmentData = JSON.parse(JSON.stringify(mockStore.state.enrollmentData));
        return (
          "quote" === firstParam &&
          AnalyticsEvents.ErrorGetMedSupQuote === secondParam &&
          isEqual(unwrappedEnrollmentData, unwrappedThirdParam)
        );
      },
      hasCalledCheckOepErrorAnalyticsEvent: () => {
        const [firstParam, secondParam, thirdParam] = (mockAnalytics.sendActionEvent as any).mock.calls[0];
        const unwrappedThirdParam = JSON.parse(JSON.stringify(thirdParam));
        const unwrappedEnrollmentData = JSON.parse(JSON.stringify(mockStore.state.enrollmentData));
        return (
          "quote" === firstParam &&
          AnalyticsEvents.ErrorMedSupCheckOep === secondParam &&
          isEqual(unwrappedEnrollmentData, unwrappedThirdParam)
        );
      },
      clickSkipThisStep: () => wrapper.find("[data-skip]").trigger("click")
    };
  };