/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { Position, VerticalAlignment, HorizontalAlignment } from '@elastic/charts';
import { i18n } from '@kbn/i18n';
import { PaletteOutput } from 'src/plugins/charts/public';
import { ArgumentType, ExpressionFunctionDefinition } from 'src/plugins/expressions/common';
import { LensIconChartArea } from '../assets/chart_area';
import { LensIconChartAreaStacked } from '../assets/chart_area_stacked';
import { LensIconChartAreaPercentage } from '../assets/chart_area_percentage';
import { LensIconChartBar } from '../assets/chart_bar';
import { LensIconChartBarStacked } from '../assets/chart_bar_stacked';
import { LensIconChartBarPercentage } from '../assets/chart_bar_percentage';
import { LensIconChartBarHorizontal } from '../assets/chart_bar_horizontal';
import { LensIconChartBarHorizontalStacked } from '../assets/chart_bar_horizontal_stacked';
import { LensIconChartBarHorizontalPercentage } from '../assets/chart_bar_horizontal_percentage';
import { LensIconChartLine } from '../assets/chart_line';

import { VisualizationType } from '../types';
import { FittingFunction } from './fitting_functions';

export interface LegendConfig {
  /**
   * Flag whether the legend should be shown. If there is just a single series, it will be hidden
   */
  isVisible: boolean;
  /**
   * Position of the legend relative to the chart
   */
  position: Position;
  /**
   * Flag whether the legend should be shown even with just a single series
   */
  showSingleSeries?: boolean;
  /**
   * Flag whether the legend is inside the chart
   */
  isInside?: boolean;
  /**
   * Horizontal Alignment of the legend when it is set inside chart
   */
  horizontalAlignment?: HorizontalAlignment;
  /**
   * Vertical Alignment of the legend when it is set inside chart
   */
  verticalAlignment?: VerticalAlignment;
  /**
   * Number of columns when legend is set inside chart
   */
  floatingColumns?: number;
}

type LegendConfigResult = LegendConfig & { type: 'lens_xy_legendConfig' };

export const legendConfig: ExpressionFunctionDefinition<
  'lens_xy_legendConfig',
  null,
  LegendConfig,
  LegendConfigResult
> = {
  name: 'lens_xy_legendConfig',
  aliases: [],
  type: 'lens_xy_legendConfig',
  help: `Configure the xy chart's legend`,
  inputTypes: ['null'],
  args: {
    isVisible: {
      types: ['boolean'],
      help: i18n.translate('xpack.lens.xyChart.isVisible.help', {
        defaultMessage: 'Specifies whether or not the legend is visible.',
      }),
    },
    position: {
      types: ['string'],
      options: [Position.Top, Position.Right, Position.Bottom, Position.Left],
      help: i18n.translate('xpack.lens.xyChart.position.help', {
        defaultMessage: 'Specifies the legend position.',
      }),
    },
    showSingleSeries: {
      types: ['boolean'],
      help: i18n.translate('xpack.lens.xyChart.showSingleSeries.help', {
        defaultMessage: 'Specifies whether a legend with just a single entry should be shown',
      }),
    },
    isInside: {
      types: ['boolean'],
      help: i18n.translate('xpack.lens.xyChart.isInside.help', {
        defaultMessage: 'Specifies whether a legend is inside the chart',
      }),
    },
    horizontalAlignment: {
      types: ['string'],
      options: [HorizontalAlignment.Right, HorizontalAlignment.Left],
      help: i18n.translate('xpack.lens.xyChart.horizontalAlignment.help', {
        defaultMessage:
          'Specifies the horizontal alignment of the legend when it is displayed inside chart.',
      }),
    },
    verticalAlignment: {
      types: ['string'],
      options: [VerticalAlignment.Top, VerticalAlignment.Bottom],
      help: i18n.translate('xpack.lens.xyChart.verticalAlignment.help', {
        defaultMessage:
          'Specifies the vertical alignment of the legend when it is displayed inside chart.',
      }),
    },
    floatingColumns: {
      types: ['number'],
      help: i18n.translate('xpack.lens.xyChart.floatingColumns.help', {
        defaultMessage: 'Specifies the number of columns when legend is displayed inside chart.',
      }),
    },
  },
  fn: function fn(input: unknown, args: LegendConfig) {
    return {
      type: 'lens_xy_legendConfig',
      ...args,
    };
  },
};

export interface AxesSettingsConfig {
  x: boolean;
  yLeft: boolean;
  yRight: boolean;
}

type TickLabelsConfigResult = AxesSettingsConfig & { type: 'lens_xy_tickLabelsConfig' };

export const tickLabelsConfig: ExpressionFunctionDefinition<
  'lens_xy_tickLabelsConfig',
  null,
  AxesSettingsConfig,
  TickLabelsConfigResult
> = {
  name: 'lens_xy_tickLabelsConfig',
  aliases: [],
  type: 'lens_xy_tickLabelsConfig',
  help: `Configure the xy chart's tick labels appearance`,
  inputTypes: ['null'],
  args: {
    x: {
      types: ['boolean'],
      help: i18n.translate('xpack.lens.xyChart.xAxisTickLabels.help', {
        defaultMessage: 'Specifies whether or not the tick labels of the x-axis are visible.',
      }),
    },
    yLeft: {
      types: ['boolean'],
      help: i18n.translate('xpack.lens.xyChart.yLeftAxisTickLabels.help', {
        defaultMessage: 'Specifies whether or not the tick labels of the left y-axis are visible.',
      }),
    },
    yRight: {
      types: ['boolean'],
      help: i18n.translate('xpack.lens.xyChart.yRightAxisTickLabels.help', {
        defaultMessage: 'Specifies whether or not the tick labels of the right y-axis are visible.',
      }),
    },
  },
  fn: function fn(input: unknown, args: AxesSettingsConfig) {
    return {
      type: 'lens_xy_tickLabelsConfig',
      ...args,
    };
  },
};

type GridlinesConfigResult = AxesSettingsConfig & { type: 'lens_xy_gridlinesConfig' };

export const gridlinesConfig: ExpressionFunctionDefinition<
  'lens_xy_gridlinesConfig',
  null,
  AxesSettingsConfig,
  GridlinesConfigResult
> = {
  name: 'lens_xy_gridlinesConfig',
  aliases: [],
  type: 'lens_xy_gridlinesConfig',
  help: `Configure the xy chart's gridlines appearance`,
  inputTypes: ['null'],
  args: {
    x: {
      types: ['boolean'],
      help: i18n.translate('xpack.lens.xyChart.xAxisGridlines.help', {
        defaultMessage: 'Specifies whether or not the gridlines of the x-axis are visible.',
      }),
    },
    yLeft: {
      types: ['boolean'],
      help: i18n.translate('xpack.lens.xyChart.yLeftAxisgridlines.help', {
        defaultMessage: 'Specifies whether or not the gridlines of the left y-axis are visible.',
      }),
    },
    yRight: {
      types: ['boolean'],
      help: i18n.translate('xpack.lens.xyChart.yRightAxisgridlines.help', {
        defaultMessage: 'Specifies whether or not the gridlines of the right y-axis are visible.',
      }),
    },
  },
  fn: function fn(input: unknown, args: AxesSettingsConfig) {
    return {
      type: 'lens_xy_gridlinesConfig',
      ...args,
    };
  },
};

type AxisTitlesVisibilityConfigResult = AxesSettingsConfig & {
  type: 'lens_xy_axisTitlesVisibilityConfig';
};

export const axisTitlesVisibilityConfig: ExpressionFunctionDefinition<
  'lens_xy_axisTitlesVisibilityConfig',
  null,
  AxesSettingsConfig,
  AxisTitlesVisibilityConfigResult
> = {
  name: 'lens_xy_axisTitlesVisibilityConfig',
  aliases: [],
  type: 'lens_xy_axisTitlesVisibilityConfig',
  help: `Configure the xy chart's axis titles appearance`,
  inputTypes: ['null'],
  args: {
    x: {
      types: ['boolean'],
      help: i18n.translate('xpack.lens.xyChart.xAxisTitle.help', {
        defaultMessage: 'Specifies whether or not the title of the x-axis are visible.',
      }),
    },
    yLeft: {
      types: ['boolean'],
      help: i18n.translate('xpack.lens.xyChart.yLeftAxisTitle.help', {
        defaultMessage: 'Specifies whether or not the title of the left y-axis are visible.',
      }),
    },
    yRight: {
      types: ['boolean'],
      help: i18n.translate('xpack.lens.xyChart.yRightAxisTitle.help', {
        defaultMessage: 'Specifies whether or not the title of the right y-axis are visible.',
      }),
    },
  },
  fn: function fn(input: unknown, args: AxesSettingsConfig) {
    return {
      type: 'lens_xy_axisTitlesVisibilityConfig',
      ...args,
    };
  },
};

export interface AxisExtentConfig {
  mode: 'full' | 'dataBounds' | 'custom';
  lowerBound?: number;
  upperBound?: number;
}

export const axisExtentConfig: ExpressionFunctionDefinition<
  'lens_xy_axisExtentConfig',
  null,
  AxisExtentConfig,
  AxisExtentConfigResult
> = {
  name: 'lens_xy_axisExtentConfig',
  aliases: [],
  type: 'lens_xy_axisExtentConfig',
  help: `Configure the xy chart's axis extents`,
  inputTypes: ['null'],
  args: {
    mode: {
      types: ['string'],
      options: ['full', 'dataBounds', 'custom'],
      help: i18n.translate('xpack.lens.xyChart.extentMode.help', {
        defaultMessage: 'The extent mode',
      }),
    },
    lowerBound: {
      types: ['number'],
      help: i18n.translate('xpack.lens.xyChart.extentMode.help', {
        defaultMessage: 'The extent mode',
      }),
    },
    upperBound: {
      types: ['number'],
      help: i18n.translate('xpack.lens.xyChart.extentMode.help', {
        defaultMessage: 'The extent mode',
      }),
    },
  },
  fn: function fn(input: unknown, args: AxisExtentConfig) {
    return {
      type: 'lens_xy_axisExtentConfig',
      ...args,
    };
  },
};

export type AxisExtentConfigResult = AxisExtentConfig & { type: 'lens_xy_axisExtentConfig' };

interface AxisConfig {
  title: string;
  hide?: boolean;
}

const axisConfig: { [key in keyof AxisConfig]: ArgumentType<AxisConfig[key]> } = {
  title: {
    types: ['string'],
    help: i18n.translate('xpack.lens.xyChart.title.help', {
      defaultMessage: 'The axis title',
    }),
  },
  hide: {
    types: ['boolean'],
    default: false,
    help: 'Show / hide axis',
  },
};

type YConfigResult = YConfig & { type: 'lens_xy_yConfig' };

export const yAxisConfig: ExpressionFunctionDefinition<
  'lens_xy_yConfig',
  null,
  YConfig,
  YConfigResult
> = {
  name: 'lens_xy_yConfig',
  aliases: [],
  type: 'lens_xy_yConfig',
  help: `Configure the behavior of a xy chart's y axis metric`,
  inputTypes: ['null'],
  args: {
    forAccessor: {
      types: ['string'],
      help: 'The accessor this configuration is for',
    },
    axisMode: {
      types: ['string'],
      options: ['auto', 'left', 'right'],
      help: 'The axis mode of the metric',
    },
    color: {
      types: ['string'],
      help: 'The color of the series',
    },
  },
  fn: function fn(input: unknown, args: YConfig) {
    return {
      type: 'lens_xy_yConfig',
      ...args,
    };
  },
};

type LayerConfigResult = LayerArgs & { type: 'lens_xy_layer' };

export const layerConfig: ExpressionFunctionDefinition<
  'lens_xy_layer',
  null,
  LayerArgs,
  LayerConfigResult
> = {
  name: 'lens_xy_layer',
  aliases: [],
  type: 'lens_xy_layer',
  help: `Configure a layer in the xy chart`,
  inputTypes: ['null'],
  args: {
    ...axisConfig,
    layerId: {
      types: ['string'],
      help: '',
    },
    xAccessor: {
      types: ['string'],
      help: '',
    },
    seriesType: {
      types: ['string'],
      options: [
        'bar',
        'line',
        'area',
        'bar_stacked',
        'area_stacked',
        'bar_percentage_stacked',
        'area_percentage_stacked',
      ],
      help: 'The type of chart to display.',
    },
    xScaleType: {
      options: ['ordinal', 'linear', 'time'],
      help: 'The scale type of the x axis',
      default: 'ordinal',
    },
    isHistogram: {
      types: ['boolean'],
      default: false,
      help: 'Whether to layout the chart as a histogram',
    },
    yScaleType: {
      options: ['log', 'sqrt', 'linear', 'time'],
      help: 'The scale type of the y axes',
      default: 'linear',
    },
    splitAccessor: {
      types: ['string'],
      help: 'The column to split by',
      multi: false,
    },
    accessors: {
      types: ['string'],
      help: 'The columns to display on the y axis.',
      multi: true,
    },
    yConfig: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      types: ['lens_xy_yConfig' as any],
      help: 'Additional configuration for y axes',
      multi: true,
    },
    columnToLabel: {
      types: ['string'],
      help: 'JSON key-value pairs of column ID to label',
    },
    palette: {
      default: `{theme "palette" default={system_palette name="default"} }`,
      help: '',
      types: ['palette'],
    },
  },
  fn: function fn(input: unknown, args: LayerArgs) {
    return {
      type: 'lens_xy_layer',
      ...args,
    };
  },
};

export type SeriesType =
  | 'bar'
  | 'bar_horizontal'
  | 'line'
  | 'area'
  | 'bar_stacked'
  | 'bar_percentage_stacked'
  | 'bar_horizontal_stacked'
  | 'bar_horizontal_percentage_stacked'
  | 'area_stacked'
  | 'area_percentage_stacked';

export type YAxisMode = 'auto' | 'left' | 'right';

export type ValueLabelConfig = 'hide' | 'inside' | 'outside';

export interface YConfig {
  forAccessor: string;
  axisMode?: YAxisMode;
  color?: string;
}

export interface XYLayerConfig {
  hide?: boolean;
  layerId: string;
  xAccessor?: string;
  accessors: string[];
  yConfig?: YConfig[];
  seriesType: SeriesType;
  splitAccessor?: string;
  palette?: PaletteOutput;
}

export interface ValidLayer extends XYLayerConfig {
  xAccessor: NonNullable<XYLayerConfig['xAccessor']>;
}

export type LayerArgs = XYLayerConfig & {
  columnToLabel?: string; // Actually a JSON key-value pair
  yScaleType: 'time' | 'linear' | 'log' | 'sqrt';
  xScaleType: 'time' | 'linear' | 'ordinal';
  isHistogram: boolean;
  // palette will always be set on the expression
  palette: PaletteOutput;
};

// Arguments to XY chart expression, with computed properties
export interface XYArgs {
  title?: string;
  description?: string;
  xTitle: string;
  yTitle: string;
  yRightTitle: string;
  yLeftExtent: AxisExtentConfigResult;
  yRightExtent: AxisExtentConfigResult;
  legend: LegendConfig & { type: 'lens_xy_legendConfig' };
  valueLabels: ValueLabelConfig;
  layers: LayerArgs[];
  fittingFunction?: FittingFunction;
  axisTitlesVisibilitySettings?: AxesSettingsConfig & {
    type: 'lens_xy_axisTitlesVisibilityConfig';
  };
  tickLabelsVisibilitySettings?: AxesSettingsConfig & { type: 'lens_xy_tickLabelsConfig' };
  gridlinesVisibilitySettings?: AxesSettingsConfig & { type: 'lens_xy_gridlinesConfig' };
  curveType?: XYCurveType;
  fillOpacity?: number;
  hideEndzones?: boolean;
  valuesInLegend?: boolean;
}

export type XYCurveType = 'LINEAR' | 'CURVE_MONOTONE_X';

// Persisted parts of the state
export interface XYState {
  preferredSeriesType: SeriesType;
  legend: LegendConfig;
  valueLabels?: ValueLabelConfig;
  fittingFunction?: FittingFunction;
  yLeftExtent?: AxisExtentConfig;
  yRightExtent?: AxisExtentConfig;
  layers: XYLayerConfig[];
  xTitle?: string;
  yTitle?: string;
  yRightTitle?: string;
  axisTitlesVisibilitySettings?: AxesSettingsConfig;
  tickLabelsVisibilitySettings?: AxesSettingsConfig;
  gridlinesVisibilitySettings?: AxesSettingsConfig;
  curveType?: XYCurveType;
  fillOpacity?: number;
  hideEndzones?: boolean;
  valuesInLegend?: boolean;
}

export type State = XYState;
const groupLabelForBar = i18n.translate('xpack.lens.xyVisualization.barGroupLabel', {
  defaultMessage: 'Bar',
});

const groupLabelForLineAndArea = i18n.translate('xpack.lens.xyVisualization.lineGroupLabel', {
  defaultMessage: 'Line and area',
});

export const visualizationTypes: VisualizationType[] = [
  {
    id: 'bar',
    icon: LensIconChartBar,
    label: i18n.translate('xpack.lens.xyVisualization.barLabel', {
      defaultMessage: 'Bar vertical',
    }),
    groupLabel: groupLabelForBar,
  },
  {
    id: 'bar_horizontal',
    icon: LensIconChartBarHorizontal,
    label: i18n.translate('xpack.lens.xyVisualization.barHorizontalLabel', {
      defaultMessage: 'H. Bar',
    }),
    fullLabel: i18n.translate('xpack.lens.xyVisualization.barHorizontalFullLabel', {
      defaultMessage: 'Bar horizontal',
    }),
    groupLabel: groupLabelForBar,
  },
  {
    id: 'bar_stacked',
    icon: LensIconChartBarStacked,
    label: i18n.translate('xpack.lens.xyVisualization.stackedBarLabel', {
      defaultMessage: 'Bar vertical stacked',
    }),
    groupLabel: groupLabelForBar,
  },
  {
    id: 'bar_percentage_stacked',
    icon: LensIconChartBarPercentage,
    label: i18n.translate('xpack.lens.xyVisualization.stackedPercentageBarLabel', {
      defaultMessage: 'Bar vertical percentage',
    }),
    groupLabel: groupLabelForBar,
  },
  {
    id: 'bar_horizontal_stacked',
    icon: LensIconChartBarHorizontalStacked,
    label: i18n.translate('xpack.lens.xyVisualization.stackedBarHorizontalLabel', {
      defaultMessage: 'H. Stacked bar',
    }),
    fullLabel: i18n.translate('xpack.lens.xyVisualization.stackedBarHorizontalFullLabel', {
      defaultMessage: 'Bar horizontal stacked',
    }),
    groupLabel: groupLabelForBar,
  },
  {
    id: 'bar_horizontal_percentage_stacked',
    icon: LensIconChartBarHorizontalPercentage,
    label: i18n.translate('xpack.lens.xyVisualization.stackedPercentageBarHorizontalLabel', {
      defaultMessage: 'H. Percentage bar',
    }),
    fullLabel: i18n.translate(
      'xpack.lens.xyVisualization.stackedPercentageBarHorizontalFullLabel',
      {
        defaultMessage: 'Bar horizontal percentage',
      }
    ),
    groupLabel: groupLabelForBar,
  },
  {
    id: 'area',
    icon: LensIconChartArea,
    label: i18n.translate('xpack.lens.xyVisualization.areaLabel', {
      defaultMessage: 'Area',
    }),
    groupLabel: groupLabelForLineAndArea,
  },
  {
    id: 'area_stacked',
    icon: LensIconChartAreaStacked,
    label: i18n.translate('xpack.lens.xyVisualization.stackedAreaLabel', {
      defaultMessage: 'Area stacked',
    }),
    groupLabel: groupLabelForLineAndArea,
  },
  {
    id: 'area_percentage_stacked',
    icon: LensIconChartAreaPercentage,
    label: i18n.translate('xpack.lens.xyVisualization.stackedPercentageAreaLabel', {
      defaultMessage: 'Area percentage',
    }),
    groupLabel: groupLabelForLineAndArea,
  },
  {
    id: 'line',
    icon: LensIconChartLine,
    label: i18n.translate('xpack.lens.xyVisualization.lineLabel', {
      defaultMessage: 'Line',
    }),
    groupLabel: groupLabelForLineAndArea,
  },
];
