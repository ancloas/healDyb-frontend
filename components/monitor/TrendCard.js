import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Line, Path, Circle } from 'react-native-svg';

import Card from '../common/Card';
import Colors from '../../constants/colors';

export default function TrendCard({
  title,
  value,
  subtitle,
  data = [],
}) {
  const chartPoints = data
    .slice(0, 6)
    .reverse()
    .map((item) => {
      const numericValue = typeof item === 'number'
        ? item
        : Number(String(item).split('/')[0] || 0);

      return {
        value: Number.isNaN(numericValue) ? 0 : numericValue,
      };
    });

  const values = chartPoints.map((point) => point.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const spread = Math.max(maxValue - minValue, 1);
  const padding = spread * 0.2;
  const chartMin = minValue - padding;
  const chartMax = maxValue + padding;
  const valueRange = Math.max(chartMax - chartMin, 1);
  const yTicks = [chartMax, (chartMax + chartMin) / 2, chartMin];
  const formatValue = (value) => `${value.toFixed(1)} kg`;
  const chartWidth = 220;
  const chartHeight = 110;
  const paddingX = 16;
  const paddingY = 14;

  const points = chartPoints.map((point, index) => {
    const x = paddingX + (index / Math.max(chartPoints.length - 1, 1)) * (chartWidth - paddingX * 2);
    const y = paddingY + ((chartMax - point.value) / valueRange) * (chartHeight - paddingY * 2);

    return { x, y, value: point.value };
  });

  const pathData = points.length > 1
    ? points.reduce((acc, point, index) => {
        const command = index === 0 ? 'M' : 'L';
        return `${acc}${command}${point.x.toFixed(1)},${point.y.toFixed(1)} `;
      }, '').trim()
    : '';

  return (
    <Card style={styles.card}>

      <View style={styles.header}>
        <Text style={styles.title}>
          {title}
        </Text>

        <Text style={styles.value}>
          {value}
        </Text>
      </View>

      <Text style={styles.subtitle}>
        {subtitle}
      </Text>

      <View style={styles.chartPlaceholder}>
        {chartPoints.length > 1 ? (
          <View style={styles.chartArea}>
            <View style={styles.plotSection}>
              <View style={styles.yAxisLabels}>
                {yTicks.map((tick) => (
                  <Text key={tick} style={styles.axisLabel}>
                    {formatValue(tick)}
                  </Text>
                ))}
              </View>

              <View style={styles.plotSurface}>
                <Svg width={chartWidth} height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
                  <Line x1={paddingX} y1={chartHeight - paddingY} x2={chartWidth - paddingX} y2={chartHeight - paddingY} stroke="#8A99A8" strokeWidth="1" />
                  <Line x1={paddingX} y1={paddingY} x2={paddingX} y2={chartHeight - paddingY} stroke="#8A99A8" strokeWidth="1" />
                  {pathData ? <Path d={pathData} fill="none" stroke={Colors.primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /> : null}
                  {points.map((point, index) => (
                    <Circle key={`${title}-${index}`} cx={point.x} cy={point.y} r="3.5" fill={Colors.primary} />
                  ))}
                </Svg>
              </View>
            </View>

            <View style={styles.xAxisLabels}>
              {points.map((point, index) => (
                <View key={`${title}-${index}`} style={styles.xLabelBlock}>
                  <Text style={styles.axisLabel}>
                    {index + 1}
                  </Text>
                  <Text style={styles.pointValueLabel}>
                    {formatValue(point.value)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ) : (
          <Text style={styles.chartText}>
            {data.length === 0 ? 'Log a reading to see your trend' : 'Enough data for a trend'}
          </Text>
        )}
      </View>

    </Card>
  );
}

const styles = StyleSheet.create({

  card: {
    marginBottom: 16,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },

  value: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.primary,
  },

  subtitle: {
    marginTop: 6,
    color: Colors.textSecondary,
    fontSize: 14,
  },

  chartPlaceholder: {
    marginTop: 20,
    height: 140,
    borderRadius: 12,
    backgroundColor: '#F4F6F8',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  chartArea: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },

  plotSection: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'stretch',
  },

  yAxisLabels: {
    width: 30,
    justifyContent: 'space-between',
    paddingTop: 4,
    paddingBottom: 16,
  },

  plotSurface: {
    flex: 1,
    position: 'relative',
    justifyContent: 'space-between',
    paddingLeft: 6,
    paddingTop: 4,
    paddingBottom: 16,
  },

  yAxis: {
    position: 'absolute',
    left: 6,
    top: 4,
    bottom: 16,
    width: 1,
    backgroundColor: '#8A99A8',
  },

  xAxis: {
    position: 'absolute',
    left: 6,
    right: 0,
    bottom: 16,
    height: 1,
    backgroundColor: '#8A99A8',
  },

  lineLayer: {
    flex: 1,
    position: 'relative',
    marginLeft: 6,
  },

  lineSegment: {
    position: 'absolute',
    height: 2,
    backgroundColor: Colors.primary,
    borderRadius: 999,
    transformOrigin: '0 0',
  },

  chartDot: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: Colors.primary,
    marginLeft: -5,
    marginTop: -5,
  },

  xAxisLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 36,
    marginTop: 6,
    gap: 4,
  },

  xLabelBlock: {
    alignItems: 'center',
    flex: 1,
  },

  axisLabel: {
    color: Colors.textSecondary,
    fontSize: 10,
  },

  pointValueLabel: {
    color: Colors.text,
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
  },

  chartText: {
    color: Colors.textMuted,
    fontSize: 14,
    textAlign: 'center',
  },

});