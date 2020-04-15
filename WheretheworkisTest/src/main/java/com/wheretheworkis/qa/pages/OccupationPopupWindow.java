package com.wheretheworkis.qa.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import com.wheretheworkis.qa.base.TestBase;
import com.wheretheworkis.qa.util.TestUtil;

public class OccupationPopupWindow extends TestBase {

	@FindBy(id = "occupationModalLabel")
	WebElement occupationPopupTitle;

	@FindBy(id = "pie-full-time")
	WebElement occupationProfilePieChart;

	@FindBy(id = "employmentLine")
	WebElement projectedEmployementLineChart;

	@FindBy(xpath = "//div[@id='pie-full-time']/div[@class='highcharts-container']")
	WebElement pieChartId;

	@FindBy(xpath = "//div[@id='employmentLine']/div[@class='highcharts-container']")
	WebElement lineChartId;

	@FindBy(xpath = "//button[@type='button' and @aria-label='Close']")
	WebElement popupWindowCloseButton;

	@FindBy(id = "modal-btn-occ-view")
	WebElement propectsAcrossLocationsLink;

	@FindBy(id = "occ-table")
	WebElement occupationTable;

	String pieChartElementCss = "> svg > g.highcharts-data-labels.highcharts-series-0.highcharts-tracker";
	String pieChartToolTipCss = "> svg > g.highcharts-tooltip > text > tspan:nth-child(1)";
	String lineChartElementCss = "> svg > g.highcharts-series-group > g.highcharts-markers.highcharts-series-0.highcharts-tracker > path:nth-child(1)";
	String lineChartToolTipCss = "> svg > g.highcharts-tooltip > text > tspan:nth-child(1)";
	TestUtil testUtil;

	public OccupationPopupWindow() {
		PageFactory.initElements(driver, this);
		testUtil = new TestUtil();
	}

	public String validateOccupationPopupTitle() {
		return occupationPopupTitle.getText();
	}

	public boolean validateOccupationProfilePieChart() {
		return occupationProfilePieChart.isDisplayed();
	}

	public boolean validateProjectedEmployementLineChart() {
		return projectedEmployementLineChart.isDisplayed();
	}

	public String validateMouseOverOnPieChart() {
		testUtil.mouseHoverOnElement(getChartsElement(pieChartId, pieChartElementCss));
		return getChartsElement(pieChartId, pieChartToolTipCss).getText();
	}

	public String validateMouseHoverLineChart() {
		testUtil.mouseHoverOnElement(getChartsElement(lineChartId, lineChartElementCss));
		return getChartsElement(lineChartId, lineChartToolTipCss).getText();
	}

	public boolean validatePopupWindowCloseButton() {
		popupWindowCloseButton.click();
		return occupationPopupTitle.isDisplayed();
	}

	public ProspectsAcrossLocationsPage mouseClickOnProspectAcrossLocations() {
		propectsAcrossLocationsLink.click();
		testUtil.waitForElementToBeVisible(occupationTable, 15);
		return new ProspectsAcrossLocationsPage();
	}

	public WebElement getChartsElement(WebElement chartID, String cssValue) {
		String idValue = chartID.getAttribute("id");
		String chartCss = "#" + idValue + " " + cssValue;
		return driver.findElement(By.cssSelector(chartCss));

	}

}
