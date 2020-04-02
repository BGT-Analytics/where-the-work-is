package com.whertheworkis.qa.testcase;

import org.testng.Assert;
import org.testng.ITestContext;
import org.testng.annotations.AfterClass;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import org.testng.asserts.SoftAssert;

import com.wheretheworkis.qa.base.TestBase;
import com.wheretheworkis.qa.pages.HomePage;
import com.wheretheworkis.qa.util.TestUtil;

public class HomePageTest extends TestBase {
	
	HomePage homePage;
	TestUtil testUtil;
	SoftAssert softAssertion;
	
	public HomePageTest(){
		super();
	}
	
	@BeforeMethod
	public void setUp(ITestContext context){
		initialization();
		homePage = new HomePage();
		testUtil = new TestUtil();
		softAssertion = new SoftAssert();
	}
	
	@Test(priority=1) 
	public void homePageLogoTest(){
		boolean flag = homePage.validateLogo();
		Assert.assertTrue(flag);	
	}
	
	@Test(priority=2)
	public void homePageTitleTest(){
		String title = homePage.validateTitle();
		Assert.assertEquals(title, "WHERE THE WORK IS");
	}
	
	@Test(priority=3)
	public void homePageHeaderSectionTest(){
		boolean flag = homePage.validateHeaderSection();
		Assert.assertTrue(flag);
	}
	
	@Test(priority=4)
	public void aboutLinkTextPresentTest(){
		boolean flag = homePage.validateAboutPageLinkText();
		Assert.assertTrue(flag);
	}
	
	@Test(priority=5)
	public void relatedResearchPageLinkTextPresentTest(){
		boolean flag = homePage.validateRelatedResearchPageLinkText();
		Assert.assertTrue(flag);
	}
	
	@Test(priority=6)
	public void methodologyPageLinkTextPresentTest(){
		boolean flag = homePage.validateMethodologyPageLinkText();
		Assert.assertTrue(flag);
	}
	
	@Test(priority=7)
	public void whatcanthistoolshowPageLinkTextPresentTest(){
		boolean flag = homePage.validateWhatcanthistoolshowPageLinkText();
		Assert.assertTrue(flag);
	}
	
	@Test(priority=8)
	public void defaultLocationSeclectedTest(){
		String defaultLocation = homePage.validateDefaultSelectedLocation();
		Assert.assertEquals(defaultLocation, "United Kingdom");
	}
	
	@Test(priority=29)
	public void dropDownMenuLocationSelecableTest(){
		String selectedLocation = homePage.validateDropDownMenu();
		Assert.assertEquals(selectedLocation, "England");
	}
	
	@Test(priority=9)
	public void occupationGroupsInformationPresentTest(){
		boolean flag = homePage.validateOccupationGroupsInformation();
		Assert.assertTrue(flag);
	}
	
	@Test(priority=10)
	public void showallButtonPresentTest(){
		boolean flag = homePage.validateShowallButton();
		Assert.assertTrue(flag);
	}
	
	@Test(priority=11)
	public void occupationGroupsDashboardHelperPresentTest(){
		boolean flag = homePage.vlidateOccupatioGroupsDashboardHelper();
		Assert.assertTrue(flag);
	}
	
	@Test(priority=12)
	public void occupationGroupsBarChartHelperPresentTest(){
		boolean flag = homePage.vlidateOccupatioGroupsBarChartHelper();
		Assert.assertTrue(flag);
	}
	
	@Test(priority=13)
	public void occupationGroupsBarChartAxisPresentTest(){
		SoftAssert softAssertion= new SoftAssert(); 
		boolean flags[] = new boolean[2];
		flags = homePage.validateOccupationBarChartAxis();
		softAssertion.assertEquals(flags[0], true);
		softAssertion.assertEquals(flags[1], true);
		softAssertion.assertAll();
	}
	
	@Test(priority=14)
	public void clickToHideBarChartLengentPresentTest(){
		boolean flag = homePage.validateClickToHideBarChartLengend();
		Assert.assertTrue(flag);
	}
	
	@Test(priority=15)
	public void barChartHigherEducationLenegntVisibilityTest(){
		String visibility = homePage.validateBarChartHigherEducationLengend();
		Assert.assertEquals(visibility, "hidden");
	}
	@Test(priority=16)
	public void barChartFutherEducationLegentVisibilityTest(){
		String visibility = homePage.validateBarChartFutherEducationLengend();
		Assert.assertEquals(visibility, "hidden");
	}
	
	@Test(priority=17)
	public void barChartSchoolLeaversLegentVisibilityTest(){
		String visibility = homePage.validateBarChartSchoolLeaversLengend();
		Assert.assertEquals(visibility, "hidden");
	}
	
	@Test(priority=18)
	public void bubbleChartPresentTest(){
		boolean flag = homePage.validateBubbleChart();
		Assert.assertTrue(flag);
	}
	
	@Test(priority=19)
	public void bubbleChartFootnotePresentTest(){
		boolean flag = homePage.validateBubbleChartFootnote();
		Assert.assertTrue(flag);
	}
	
	@Test(priority=20)
	public void footerSectionLogoPresentTest(){
		boolean flags[] = new boolean[3];
		flags = homePage.validateFooterSectionLogo();
		softAssertion.assertEquals(flags[0], true);
		softAssertion.assertEquals(flags[1], true);
		softAssertion.assertEquals(flags[1], true);
		softAssertion.assertAll();
	}
	
	
	@Test(priority=30)
	public void mouseHoverOnDashboardOccupationGroupsTest(){
		String[] colours = new String[2];
		colours = homePage.validateMouseHoverOnDashboardOccupationGroups();
		softAssertion.assertEquals(colours[0], "#FDAC00");
		softAssertion.assertEquals(colours[1], "#e2be7c");
		softAssertion.assertAll();
	}
	
	@Test(priority=31)
	public void mouseHoverOnBarChartOccupationGroupsTest(ITestContext context){
		String[] colours = new String[2];
		colours = homePage.validateMouseHoverOnBarChartOccupationGroups();
		context.setAttribute("webDriver", driver);
		softAssertion.assertEquals(colours[0], "background-color: rgb(226, 190, 124);");
		softAssertion.assertEquals(colours[1], "#e2be7c");
		softAssertion.assertAll();
	}
	
	@Test(priority=21)
	public void barChartDataClassificationTest(){
		String[] colours = new String[3];
		colours = homePage.validateBarChartDataClassification();
		softAssertion.assertEquals(colours[0], "#ECF0F1");
		softAssertion.assertEquals(colours[1], "#959DA6");
		softAssertion.assertEquals(colours[2], "#667481");
		softAssertion.assertAll();	
	}

	@Test(priority=22)
	public void barChartToolTipTest(){
		String toolTipText = homePage.validateBarChartToolTip();
		Assert.assertEquals(toolTipText.trim(), "Associate Professional & Technical Occupations");	
	}
	
	@Test(priority=23)
	public void barChartJobOpeningToolTipTest(){
		String toolTipText = homePage.validateBarChartJobOpeningToolTip();
		Assert.assertEquals(toolTipText, "Number of job openings for entry-level roles (<2 years of experience) in 2015, based on online job postings and ONS vacancy data");
	}
	
	@Test(priority=24) 
	public void bubbleChartToolTipTest(){
		String toolTipText = homePage.validateLineChartToolTip();
		Assert.assertEquals(toolTipText, "Health Associate Professionals");
	}
	
	@Test(priority=32)
	public void mouseHoverOnBubbleChartOccupationGroupsTest(){
		String color = homePage.validateMouseHoverOnBubbleChartOccupationGroups();
		Assert.assertEquals(color, "#FDAC00");
		
	}
	
	@Test(priority=25)
	public void bubbleChartSalaryToolTipTest(){
		String salaryToolTip = homePage.validateBubbleChartSalaryToolTip();
		Assert.assertEquals(salaryToolTip, "Average salary advertised for entry-level roles (<2 years of experience) in 2015");
	}
	
	@Test(priority=26)
	public void bubbleChartOpportunityToolTipTest(){
		String opportunityToolTip = homePage.validateBubbleChartOpportunityToolTip();
		Assert.assertEquals(opportunityToolTip, "Level of opportunity facing recent course completers, measured in terms of openings relative to recent completers. Occupations with higher opportunity scores are occupations where course completers face less competition.");
	}
	
	@Test(priority=27)
	public void bubbleChartEducationDropDownToolTipTest(){
		String educationToolTip = homePage.validateBubbleChartEducationDropDownToolTip();
		Assert.assertEquals(educationToolTip, "click to change education level");
	}
	
	@Test(priority=28)
	public void bubbleChartEducationDropDownMenuTest(){
		String selectedOption = homePage.validateBubbleChartEducationDropDownMenu();
		Assert.assertEquals(selectedOption, "higher education graduates (HE)");
	}
	
	@Test(priority=33)
	public void mouseClickOnOccupationGroupDashboardTest(){
		String classText = homePage.validateMouseClickOnOccupationGroupDashBoard();
		Assert.assertEquals(classText, "job-family selected");
	}
	
	@Test(priority=34)
	public void barChartTitleTest(){
		String barChartTitle = homePage.validateBarChartTitle();
		Assert.assertEquals(barChartTitle, "Which associate professional & technical occupations have the most openings?");
	}
	
	@Test(priority=35)
	public void bubbleChartDataTest(){
		String bubbleChartTitle = homePage.validateBubbleChartData();
		Assert.assertEquals(bubbleChartTitle, "Health Associate Professionals");
	}
	
	@Test(priority=36)
	public void barChartMouseHoverOnOccupationTest(){
		String toolTip = homePage.validateBarChartSelectedOccupationMouseHover();
		Assert.assertEquals(toolTip, "Sales, Marketing & Related Associate Professionals");
	}
	
	@Test(priority=37)
	public void bubbleChartMouseHoverOnOccupationTest(){
		String toolTip = homePage.validateBubbleChartSelectedOccupationMouseHover();
		Assert.assertEquals(toolTip, "Sales, Marketing & Related Associate Professionals");
	}
	
	@Test(priority=38)
	public void showallButtonFunctionTest(){
		String classText = homePage.validateShowallButtonFunction();
		Assert.assertEquals(classText, "job-family");
	}
	
	@Test(priority=39)
	public void mouseClickBarChartOccupationGroupTest(){
		String classText = homePage.validateBarChartOccupationGroups();
		Assert.assertEquals(classText, "job-family selected");
	}
	
	@Test(priority=40)
	public void barChartPopupWindowOpenTest(){
		Assert.assertTrue(homePage.validateBarChartPopupWindow());
	}
	
	@Test(priority=41)
	public void bubbleChartPopupWindowOpenTest(){
		Assert.assertTrue(homePage.validateBubbleChartPopupWindow());
	}
	
	@AfterMethod
	public void tearDown(){
		driver.quit();
	}
}
