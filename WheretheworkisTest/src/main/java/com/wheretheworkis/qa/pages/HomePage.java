package com.wheretheworkis.qa.pages;

import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import com.wheretheworkis.qa.base.TestBase;
import com.wheretheworkis.qa.util.TestUtil;

public class HomePage extends TestBase{

	//Page Factory
	@FindBy(id="site-icon")
	WebElement wtwiLogo;
	
	@FindBy(id="site-title")
	WebElement wtwiTitle;
	
	@FindBy(id="navbar")
	WebElement wtwiHeader;
	
	@FindBy(linkText="About")
	WebElement aboutPageLinkText;
	
	@FindBy(linkText="Related research")
	WebElement relatedResearchPageLinkText;
	
	@FindBy(linkText="Methodology")
	WebElement methodologyPageLinkText;
	
	@FindBy(linkText="What can this tool show?")
	WebElement whatcanthistoolshowPageLinkText;
	
	@FindBy(id="current-location-name")
	WebElement defaultSelectedLoction;
	
	@FindBy(id="dropdown-div")
	WebElement dropDownMenu;
	
	@FindBy(xpath="//ul[@id='location-select-list']//li/a")
	List<WebElement> locationsToBeSelected;
	
	@FindBy(id="default-occ-info")
	WebElement occupationGroupsInfromation;
	
	@FindBy(xpath="//a[@class='btn btn-sm btn-navy hidden-xs']")
	WebElement showallButton;
	
	@FindBy(xpath="//div[@id='helper-job-family']")
	WebElement occupationGroupsDashboardHelper;
	
	@FindBy(xpath="//div[@id='helper-occupation']")
	WebElement occupationGroupsBarChartHelper;
	
	@FindBy(css="#highcharts-0 > svg > g.highcharts-axis-labels.highcharts-xaxis-labels")
	WebElement occupationGroupsBarChartXaxisInformation;
	
	@FindBy(css="#highcharts-0 > svg > g.highcharts-axis-labels.highcharts-yaxis-labels")
	WebElement occupationGroupsBarChartYaxisInformation;
	
	@FindBy(css="#highcharts-0 > svg > g.highcharts-legend")
	WebElement clickToHideBarChartLengent;
	
	@FindBy(css="#highcharts-0 > svg > g.highcharts-legend > g:nth-child(2) > g > g:nth-child(1)")
	WebElement barChartHigherEducationLenegnt;
	
	@FindBy(css="#highcharts-0 > svg > g.highcharts-legend > g:nth-child(2) > g > g:nth-child(2)")
	WebElement barChartFutherEducationLenegnt;
	
	@FindBy(css="#highcharts-0 > svg > g.highcharts-legend > g:nth-child(2) > g > g:nth-child(3)")
	WebElement barChartSchoolLeaversLenegnt;
	
	@FindBy(css="#highcharts-0 > svg > g.highcharts-series-group > g.highcharts-series.highcharts-series-0.highcharts-tracker")
	WebElement barChartHigherEducationLenegntVisibity;
	
	@FindBy(css="#highcharts-0 > svg > g.highcharts-series-group > g.highcharts-series.highcharts-series-1.highcharts-tracker")
	WebElement barChartFutherEducationLenegntVisibity;
	
	@FindBy(css="#highcharts-0 > svg > g.highcharts-series-group > g.highcharts-series.highcharts-series-2.highcharts-tracker")
	WebElement barChartSchoolLeaversLenegntVisibity;
	
	@FindBy(css="#highcharts-4 > svg")
	WebElement bubbleChart;
	
	@FindBy(xpath="//div[@class='row footnote']//p")
	WebElement bubbleChartFootnote;
	
	@FindBy(xpath="//div[@id='footer']//a[contains(@href,'www.jpmorganchase.com')]/img")
	WebElement jpmorganLogo;
	
	@FindBy(xpath="//div[@id='footer']//a[contains(@href,'burning-glass')]/img")
	WebElement burningglassLogo;
	
	@FindBy(xpath="//div[@id='footer']//a[contains(@href,'www.ippr.org/')]/img")
	WebElement ipprLogo;
	
	@FindBy(xpath="(//div[@id='family1'])[1]/div")
	WebElement dashboardOccupationGroup;
	
	@FindBy(css="#highcharts-0 > svg > g.highcharts-series-group > g.highcharts-series.highcharts-series-2.highcharts-tracker > rect:nth-child(1)")
	WebElement barChartOccupationGroup;
	
	@FindBy(css="#highcharts-4 > svg > g.highcharts-series-group > g.highcharts-markers.highcharts-series-0.highcharts-tracker > path:nth-child(39)")
	WebElement bubbleChartOccupationGroupData;
	
	@FindBy(css="#highcharts-0 > svg > g.highcharts-series-group > g.highcharts-series.highcharts-series-0.highcharts-tracker > rect:nth-child(1)")
	WebElement higherEducationColor;
	
	@FindBy(css="#highcharts-0 > svg > g.highcharts-series-group > g.highcharts-series.highcharts-series-1.highcharts-tracker > rect:nth-child(1)")
	WebElement futherEducationColor;
	
	@FindBy(css="#highcharts-0 > svg > g.highcharts-series-group > g.highcharts-series.highcharts-series-2.highcharts-tracker > rect:nth-child(1)")
	WebElement schoolLeaversColor;
	
	@FindBy(xpath="(//div[@class='highcharts-tooltip']/span/table//tr)[1]")
	WebElement barChatToolTip;
	
	@FindBy(xpath="(//p[@class='text-center chart-subtitle']/a)[2]")
	WebElement barChartJobOpeningToolTip;
	
	@FindBy(xpath="(//div[@class='highcharts-tooltip']/span/table)[2]//tr[1]")
	WebElement bubbleChartToolTip;
	
	@FindBy(xpath="//a[text()='Salary' and @class='fake-underline']")
	WebElement bubbleChartSalaryToolTip;
	
	@FindBy(xpath="//a[text()='opportunity' and @class='fake-underline']")
	WebElement bubleChartOpportunityToolTip;
	
	@FindBy(id="edu-dropdown-menu")
	WebElement bubbleChartEducationDropDownToolTip;
	
	@FindBy(id="selected-edu")
	WebElement educationDropDownSelectedOption;
	
	@FindBy(id="he-select")
	WebElement higherEduationDropDownOption;
	
	@FindBy(id="bar-chart-title")
	WebElement barChartTitle;
	
	@FindBy(xpath="//div[@id='scatter-comp']/div[@class='highcharts-container']")
	WebElement bubbleChartOccupationData;
	
	@FindBy(xpath="//div[@id='bar-demand']/div[@class='highcharts-container']")
	WebElement barChartSelectedOccupationGroupData;
	
	@FindBy(css="#highcharts-16 > svg > g.highcharts-series-group > g.highcharts-markers.highcharts-series-0.highcharts-tracker > path:nth-child(3)")
	WebElement bubbleChartSelectedOccupationGroupData;
	
	@FindBy(xpath="(//div[@class='highcharts-tooltip']/span/table)[2]//tr[1]/th")
	WebElement bubbleChartSelectedToolTip;
	
	@FindBy(id="occupationModalLabel")
	WebElement occupationPopupTitle;
	
	
	
	TestUtil testUtil;
	String locationToBeSelected = "England";
	String barChartElementCss = "> svg > g.highcharts-series-group > g.highcharts-series.highcharts-series-2.highcharts-tracker > rect:nth-child(1)";
	String bubbleChartElementCss = "> svg > g.highcharts-series-group > g.highcharts-markers.highcharts-series-0.highcharts-tracker > path:nth-child(11)";
	String bubbleChartSelectedElementCss = "> svg > g.highcharts-series-group > g.highcharts-markers.highcharts-series-0.highcharts-tracker > path:nth-child(3)";
	
	public HomePage(){
		PageFactory.initElements(driver, this);
		testUtil = new TestUtil();
	}
	
	public boolean validateLogo(){
		return wtwiLogo.isDisplayed();
	}
	
	public String validateTitle(){
		return wtwiTitle.getText().trim();
	}
	
	public boolean validateHeaderSection(){
		return wtwiHeader.isDisplayed();
	}
	
	public boolean validateAboutPageLinkText(){
		return aboutPageLinkText.isDisplayed();
	}
	
	public boolean validateRelatedResearchPageLinkText(){
		return relatedResearchPageLinkText.isDisplayed();
	}
	
	public boolean validateMethodologyPageLinkText(){
		return methodologyPageLinkText.isDisplayed();
	}
	
	public boolean validateWhatcanthistoolshowPageLinkText(){
		return whatcanthistoolshowPageLinkText.isDisplayed();
	}
	
	public String validateDefaultSelectedLocation(){
		return defaultSelectedLoction.getText();
	}
	
	public String validateDropDownMenu(){
		 testUtil.dropDownSelect(dropDownMenu, locationsToBeSelected, locationToBeSelected);
		 return defaultSelectedLoction.getText();	 
	 }
	
	public boolean validateOccupationGroupsInformation(){
		return occupationGroupsInfromation.isDisplayed();
	}
	
	public boolean validateShowallButton(){
		return showallButton.isDisplayed();
	}
	
	public boolean vlidateOccupatioGroupsDashboardHelper(){
		testUtil.waitForElementToBeVisible(occupationGroupsDashboardHelper, 10);
		return occupationGroupsDashboardHelper.isDisplayed();
	}
	
	public boolean vlidateOccupatioGroupsBarChartHelper(){
		testUtil.waitForElementToBeVisible(occupationGroupsBarChartHelper, 10);
		return occupationGroupsBarChartHelper.isDisplayed();
	}
	
	public boolean[] validateOccupationBarChartAxis(){
		boolean boolArray[] = new boolean[2];
		boolArray[0] = occupationGroupsBarChartXaxisInformation.isDisplayed();
		boolArray[1] = occupationGroupsBarChartYaxisInformation.isDisplayed();
		return boolArray;
	}
	
	public boolean validateClickToHideBarChartLengend(){
		return clickToHideBarChartLengent.isDisplayed();
	}
	
	public String validateBarChartHigherEducationLengend(){
		barChartHigherEducationLenegnt.click();
		return barChartHigherEducationLenegntVisibity.getAttribute("visibility");	
	}
	
	public String validateBarChartFutherEducationLengend(){
		barChartFutherEducationLenegnt.click();
		return barChartFutherEducationLenegntVisibity.getAttribute("visibility");	
	}
	
	public String validateBarChartSchoolLeaversLengend(){
		barChartSchoolLeaversLenegnt.click();
		return barChartSchoolLeaversLenegntVisibity.getAttribute("visibility");
	}
	
	public boolean validateBubbleChart(){
		return bubbleChart.isDisplayed();
	}
	
	public boolean validateBubbleChartFootnote(){
		return bubbleChartFootnote.isDisplayed();
	}
	
	public boolean[] validateFooterSectionLogo(){
		boolean boolArray[] = new boolean[3];
		boolArray[0] = jpmorganLogo.isDisplayed();
		boolArray[1] = burningglassLogo.isDisplayed();
		boolArray[2] = ipprLogo.isDisplayed();
		return boolArray;
	}
	
	public String[] validateMouseHoverOnDashboardOccupationGroups(){
		String colours[] = new String[2];
		testUtil.mouseHoverOnElement(dashboardOccupationGroup);
		colours[0] = barChartOccupationGroup.getAttribute("fill");
		colours[1] = bubbleChartOccupationGroupData.getAttribute("fill");
		return colours;
	}
	
	public String[] validateMouseHoverOnBarChartOccupationGroups(){
		String colours[] = new String[2];
		testUtil.mouseHoverOnElement(barChartOccupationGroup);
		colours[0] = dashboardOccupationGroup.getAttribute("style");
		colours[1] = bubbleChartOccupationGroupData.getAttribute("fill");
		return colours;
	}
	
	public String[] validateBarChartDataClassification(){
		String colours[] = new String[3];
		colours[0] = higherEducationColor.getAttribute("fill");
		colours[1] = futherEducationColor.getAttribute("fill");
		colours[2] = schoolLeaversColor.getAttribute("fill");
		return colours;
	}
	
	public String validateBarChartToolTip(){
		testUtil.mouseHoverOnElement(barChartOccupationGroup);
		return barChatToolTip.getText();
	}
	
	public String validateBarChartJobOpeningToolTip(){
		return barChartJobOpeningToolTip.getAttribute("data-original-title");
	}
	
	public String validateLineChartToolTip(){
		testUtil.mouseHoverOnElement(bubbleChartOccupationGroupData);
		return bubbleChartToolTip.getText();
	}
	
	public String validateMouseHoverOnBubbleChartOccupationGroups(){
		testUtil.mouseHoverOnElement(bubbleChartOccupationGroupData);
		return barChartOccupationGroup.getAttribute("fill");
	}
	
	public String validateBubbleChartSalaryToolTip(){
		return bubbleChartSalaryToolTip.getAttribute("data-original-title");
	}
	
	public String validateBubbleChartOpportunityToolTip(){
		return bubleChartOpportunityToolTip.getAttribute("data-original-title");
	}
	
	public String validateBubbleChartEducationDropDownToolTip(){
		return bubbleChartEducationDropDownToolTip.getAttribute("title");
	}
	
	public String validateBubbleChartEducationDropDownMenu(){
		
		bubbleChartEducationDropDownToolTip.click();
		higherEduationDropDownOption.click();
		return educationDropDownSelectedOption.getText();
	}
	
	public String validateMouseClickOnOccupationGroupDashBoard(){
		dashboardOccupationGroup.click();
		return dashboardOccupationGroup.getAttribute("class");
	}
	
	public String validateBarChartTitle(){
		dashboardOccupationGroup.click();
		return barChartTitle.getText();
	}
	
	public String validateBubbleChartData(){
		dashboardOccupationGroup.click();
		testUtil.waitForElementToBeVisible(getChartsElementCss(bubbleChartOccupationData, bubbleChartElementCss), 10);
		testUtil.mouseHoverOnElement(getChartsElementCss(bubbleChartOccupationData, bubbleChartElementCss));
		return bubbleChartToolTip.getText();
	}
	
	public String validateBarChartSelectedOccupationMouseHover(){
		dashboardOccupationGroup.click();
		testUtil.waitForElementToBeVisible(getChartsElementCss(barChartSelectedOccupationGroupData, barChartElementCss), 10);
		testUtil.mouseHoverOnElement(getChartsElementCss(barChartSelectedOccupationGroupData, barChartElementCss));
		return barChatToolTip.getText();
	}
	
	public String validateBubbleChartSelectedOccupationMouseHover(){
		dashboardOccupationGroup.click();
		testUtil.waitForElementToBeVisible(getChartsElementCss(bubbleChartOccupationData, bubbleChartSelectedElementCss), 10);
		testUtil.mouseHoverOnElement(getChartsElementCss(bubbleChartOccupationData, bubbleChartSelectedElementCss));
		return bubbleChartToolTip.getText();
	}
	
	public String validateShowallButtonFunction(){
		dashboardOccupationGroup.click();
		showallButton.click();
		return dashboardOccupationGroup.getAttribute("class");	
	}
	
	public String validateBarChartOccupationGroups(){
		barChartOccupationGroup.click();
		return dashboardOccupationGroup.getAttribute("class");
	}
	
	public boolean validateBarChartPopupWindow(){
		dashboardOccupationGroup.click();
		testUtil.waitForElementToBeVisible(getChartsElementCss(barChartSelectedOccupationGroupData, barChartElementCss), 10);
		getChartsElementCss(barChartSelectedOccupationGroupData, barChartElementCss).click();
		testUtil.waitForElementToBeVisible(occupationPopupTitle, 10);
		if(driver.getWindowHandles().size()==1){
			return true;
		}
		else{
			return false;
		}
	}
	
	public boolean validateBubbleChartPopupWindow(){
		dashboardOccupationGroup.click();
		testUtil.waitForElementToBeVisible(getChartsElementCss(bubbleChartOccupationData, bubbleChartSelectedElementCss), 10);
		getChartsElementCss(bubbleChartOccupationData, bubbleChartSelectedElementCss).click();
		testUtil.waitForElementToBeVisible(occupationPopupTitle, 5);
		if(driver.getWindowHandles().size()==1){
			return true;
		}
		else{
			return false;
		}
	}
	
/*	public WebElement getBarChartSelectedElement(String highChartValue){
		String barChatCss = "#"+highChartValue+" "+"> svg > g.highcharts-series-group > "
				+ "g.highcharts-series.highcharts-series-2.highcharts-tracker > rect:nth-child(1)";
		return driver.findElement(By.cssSelector(barChatCss));
	}*/
	
	public WebElement getChartsElementCss(WebElement chartID, String cssValue){
		String idValue = chartID.getAttribute("id");
		String chartCss = "#"+idValue+" "+cssValue;
		return driver.findElement(By.cssSelector(chartCss));
	}
	
	public AboutPage clickOnAboutPageLink(){
		aboutPageLinkText.click();
		return new AboutPage();
	}
	
	public MethodologyPage clickOnMethodologyPage(){
		methodologyPageLinkText.click();
		return new MethodologyPage();
	}
	
	
	public OccupationPopupWindow clickOnOccupation(){
		dashboardOccupationGroup.click();
		testUtil.waitForElementToBeVisible(getChartsElementCss(barChartSelectedOccupationGroupData, barChartElementCss), 10);
		getChartsElementCss(barChartSelectedOccupationGroupData, barChartElementCss).click();
		testUtil.waitForElementToBeVisible(occupationPopupTitle, 10);
		Set<String> handles = driver.getWindowHandles();
		Iterator<String> iterator = handles.iterator();
		String popupWindow = iterator.next();
		driver.switchTo().window(popupWindow);
		return new OccupationPopupWindow();
	}
	
	
}

