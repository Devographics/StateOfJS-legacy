// generic
import VerticalBarBlock from 'core/blocks/VerticalBarBlock'
import HorizontalBarBlock from 'core/blocks/HorizontalBarBlock'
import CountriesBlock from 'core/blocks/CountriesBlock'
import OpinionScaleBlock from 'core/blocks/OpinionScaleBlock'

// demographics
import SourceBreakdownBlock from 'modules/demographics/blocks/SourceBreakdownBlock'
import GenderBreakdownBlock from 'modules/demographics/blocks/GenderBreakdownBlock'

// features
import FeaturesOverviewBlock from 'modules/features/blocks/FeaturesOverviewBlock'
import FeaturesSectionOverviewBlock from 'modules/features/blocks/FeaturesSectionOverviewBlock'
import FeatureBlock from 'modules/features/blocks/FeatureBlock'

// tools
import ToolsOverviewBlock from 'modules/tools/blocks/ToolsOverviewBlock'
import ToolsSectionOverviewBlock from 'modules/tools/blocks/ToolsSectionOverviewBlock'
import ToolOpinionBlock from 'modules/tools/blocks/ToolOpinionBlock'

const blockRegistry = {
    // generic
    'vertical-bar': VerticalBarBlock,
    'horizontal-bar': HorizontalBarBlock,
    countries: CountriesBlock,
    'opinion-scale': OpinionScaleBlock,

    //demographics
    source: SourceBreakdownBlock,
    gender: GenderBreakdownBlock,

    // features
    'features-overview': FeaturesOverviewBlock,
    'features-section-overview': FeaturesSectionOverviewBlock,
    feature: FeatureBlock,

    // tools
    'tools-overview': ToolsOverviewBlock,
    'tools-section-overview': ToolsSectionOverviewBlock,
    tool: ToolOpinionBlock
}

export default blockRegistry
