import React, { useContext, useState } from "react";
import styles from "./SalesChartWidget.module.css";
import { UserContext } from "../../context/UserContext";
import { useTranslation } from "react-i18next";
import ButtonComponent from "../buttons/ButtonComponent";
import Widget from "./Widget";
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import orders from "../../mocks/orders";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartSeries {
    name: string;
    color: string;
    measure: "turnover" | "soldAmount";
    chartType: "bar" | "line";
    timeRange: { from: string; to: string };
}

const SalesChartWidget: React.FC = () => {
    const { selectedShopId } = useContext(UserContext);
    const { t } = useTranslation();
    const [series, setSeries] = useState<ChartSeries[]>([]);
    const [newSeries, setNewSeries] = useState<ChartSeries>({
        name: `Seria ${series.length + 1}`,
        color: `var(--blue-1)`,
        measure: "",
        chartType: "",
        timeRange: { from: "", to: "" }
    });
    const [activeSeries, setActiveSeries] = useState<number>(0);
    const [timeUnit, setTimeUnit] = useState<'day' | 'week' | 'month'>('');

    if (!selectedShopId) {
        return (
            <Widget title={t("widgets.sales-chart.title")}>
                <div>{t("widgets.sales-chart.error-no-id")}</div>
            </Widget>
        );
    }

    const handleAddSeries = () => {
        if (series.length < 3) {
            setSeries([...series, { 
                ...newSeries,
                name: `Seria ${series.length + 1}`,
                color: `var(--blue-${series.length + 1})`
            }]);
            setNewSeries({
                ...newSeries,
                name: `Seria ${series.length + 2}`,
                color: `var(--blue-1)`
            });
        }
    };

    const outerColor = "var(--brown-4)";
    const innerColor = "var(--brown-3)";
    const lineColor = "var(--grey-6)";

    const getChartData = (series: ChartSeries) => {
        const { measure, timeRange } = series;
        const startDate = new Date(timeRange.from);
        const endDate = new Date(timeRange.to);

        const filteredOrders = orders.filter(order => {
            const orderDate = new Date(order.timestamp);
            return orderDate >= startDate && orderDate <= endDate;
        });

        const getGroupKey = (date: Date) => {
            if (timeUnit === 'day') {
                return date.toISOString().split('T')[0];
            } else if (timeUnit === 'week') {
                const weekStart = new Date(date);
                weekStart.setDate(date.getDate() - date.getDay());
                return weekStart.toISOString().split('T')[0];
            } else {
                return `${date.getFullYear()}-${date.getMonth() + 1}`;
            }
        };

        const groupedData = filteredOrders.reduce((acc, order) => {
            const date = new Date(order.timestamp);
            const groupKey = getGroupKey(date);
            
            if (!acc[groupKey]) {
                acc[groupKey] = {
                    turnover: 0,
                    soldAmount: 0
                };
            }

            acc[groupKey].turnover += order.totalGain;
            acc[groupKey].soldAmount += order.amountOrdered;

            return acc;
        }, {} as Record<string, { turnover: number; soldAmount: number }>);

        const sortedKeys = Object.keys(groupedData).sort();

        const groupingFormat = timeUnit;
        const labels = sortedKeys.map(key => {
            if (groupingFormat === 'day') {
                return new Date(key).toLocaleDateString('pl-PL', { day: 'numeric', month: 'long' });
            } else if (groupingFormat === 'week') {
                const date = new Date(key);
                const weekEnd = new Date(date);
                weekEnd.setDate(date.getDate() + 6);
                return `${date.toLocaleDateString('pl-PL', { day: 'numeric' })} - ${weekEnd.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long' })}`;
            } else {
                return new Date(key + '-01').toLocaleDateString('pl-PL', { month: 'long', year: 'numeric' });
            }
        });

        const data = sortedKeys.map(key => 
            measure === 'turnover' ? groupedData[key].turnover : groupedData[key].soldAmount
        );

        return { labels, data };
    };

    const chartData = series[activeSeries] ? (() => {
        const { labels, data } = getChartData(series[activeSeries]);
        return {
            labels,
            datasets: [{
                label: series[activeSeries].name,
                data,
                borderColor: series[activeSeries].color,
                backgroundColor: series[activeSeries].color,
                tension: 0.1
            }]
        };
    })() : { labels: [], datasets: [] };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: series[activeSeries]?.measure === 'turnover' 
                        ? t("widgets.sales-chart.turnover")
                        : t("widgets.sales-chart.sold-units"),
                    font: {
                        family: 'var(--font-medieval)',
                        size: 14
                    },
                    rotation: 0
                }
            }
        }
    };

    const renderChart = () => {
        if (series.length === 0) return null;
        
        const currentSeries = series[activeSeries];
        
        if (currentSeries.chartType === 'line') {
            return <Line data={chartData} options={chartOptions} />;
        } else {
            return <Bar data={chartData} options={chartOptions} />;
        }
    };

    const activeSeriesData = series[activeSeries] || newSeries;

    return (
        <Widget title={t("widgets.sales-chart.title")}>
            <div className={styles.chartContainer}>
                <div className={styles.controlSection}>
                    <div className={styles.inputGroup}>
                        <select
                            value={activeSeriesData.measure}
                            onChange={(e) => {
                                if (series[activeSeries]) {
                                    const updatedSeries = [...series];
                                    updatedSeries[activeSeries] = {
                                        ...updatedSeries[activeSeries],
                                        measure: e.target.value as "turnover" | "soldAmount"
                                    };
                                    setSeries(updatedSeries);
                                } else {
                                    setNewSeries({...newSeries, measure: e.target.value as "turnover" | "soldAmount"});
                                }
                            }}
                            className={styles.select}
                        >
                            <option value="">{t("widgets.sales-chart.select-measure")}</option>
                            <option value="turnover">{t("widgets.sales-chart.turnover")}</option>
                            <option value="soldAmount">{t("widgets.sales-chart.sold-units")}</option>
                        </select>
                    </div>

                    <div className={styles.inputGroup}>
                        <select
                            value={activeSeriesData.chartType}
                            onChange={(e) => {
                                if (series[activeSeries]) {
                                    const updatedSeries = [...series];
                                    updatedSeries[activeSeries] = {
                                        ...updatedSeries[activeSeries],
                                        chartType: e.target.value as "bar" | "line"
                                    };
                                    setSeries(updatedSeries);
                                } else {
                                    setNewSeries({...newSeries, chartType: e.target.value as "bar" | "line"});
                                }
                            }}
                            className={styles.select}
                        >
                            <option value="">{t("widgets.sales-chart.select-type")}</option>
                            <option value="bar">{t("widgets.sales-chart.bar")}</option>
                            <option value="line">{t("widgets.sales-chart.line")}</option>
                        </select>
                    </div>

                    <div className={styles.inputGroup}>
                        <select
                            value={timeUnit}
                            onChange={(e) => setTimeUnit(e.target.value as 'day' | 'week' | 'month')}
                            className={styles.select}
                        >
                            <option value="">{t("widgets.sales-chart.group-by")}</option>
                            <option value="day">{t("widgets.sales-chart.day")}</option>
                            <option value="week">{t("widgets.sales-chart.week")}</option>
                            <option value="month">{t("widgets.sales-chart.month")}</option>
                        </select>
                    </div>

                    <div className={styles.dateRange}>
                        <div className={styles.inputGroup}>
                            <label>{t("widgets.sales-chart.from")}</label>
                            <input
                                type="date"
                                value={activeSeriesData.timeRange.from}
                                onChange={(e) => {
                                    if (series[activeSeries]) {
                                        const updatedSeries = [...series];
                                        updatedSeries[activeSeries] = {
                                            ...updatedSeries[activeSeries],
                                            timeRange: {...updatedSeries[activeSeries].timeRange, from: e.target.value}
                                        };
                                        setSeries(updatedSeries);
                                    } else {
                                        setNewSeries({
                                            ...newSeries,
                                            timeRange: {...newSeries.timeRange, from: e.target.value}
                                        });
                                    }
                                }}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>{t("widgets.sales-chart.to")}</label>
                            <input
                                type="date"
                                value={activeSeriesData.timeRange.to}
                                onChange={(e) => {
                                    if (series[activeSeries]) {
                                        const updatedSeries = [...series];
                                        updatedSeries[activeSeries] = {
                                            ...updatedSeries[activeSeries],
                                            timeRange: {...updatedSeries[activeSeries].timeRange, to: e.target.value}
                                        };
                                        setSeries(updatedSeries);
                                    } else {
                                        setNewSeries({
                                            ...newSeries,
                                            timeRange: {...newSeries.timeRange, to: e.target.value}
                                        });
                                    }
                                }}
                                className={styles.input}
                            />
                        </div>
                    </div>

                    <div className={styles.buttonContainer}>
                        <ButtonComponent
                            width={120}
                            height={44}
                            outerColor={outerColor}
                            innerColor={innerColor}
                            lineColor={lineColor}
                            onClick={handleAddSeries}
                        >
                            <span style={{ color: 'var(--yellow-2-button-text)' }}>{t("widgets.sales-chart.add-series")}</span>
                        </ButtonComponent>
                    </div>
                </div>

                <div className={styles.seriesList}>
                    {series.map((s, index) => (
                        <div 
                            key={index} 
                            className={`${styles.seriesItem} ${index === activeSeries ? styles.active : ''}`}
                            onClick={() => setActiveSeries(index)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className={styles.colorBox} style={{ backgroundColor: s.color }} />
                            <span>{s.name}</span>
                        </div>
                    ))}
                </div>

                <div className={styles.chartSection}>
                    <div style={{ width: '100%', height: '100%' }}>
                        {renderChart()}
                    </div>
                </div>
            </div>
        </Widget>
    );
};

export default SalesChartWidget;
