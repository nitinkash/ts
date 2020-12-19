# SF_DailyRangeSTUDY
# By Bharath Jayaram
# Last Update 14 Jul 2020

input RangePeriod = 20;
input timeFrame = AggregationPeriod.DAY;

def TodayHigh = Highest(high(period = timeFrame), 1);
def TodayLow = Lowest(low(period = timeFrame), 1);

def DailyRange = TodayHigh - TodayLow;
def AvgRange = Average(DailyRange, RangePeriod);

AddLabel(yes, "AvgR: " + AvgRange, Color.YELLOW);
AddLabel(yes, "TodayR: " + DailyRange, Color.RED);