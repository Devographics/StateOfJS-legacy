// Generic Blocks
import VerticalBarBlock from './VerticalBarBlock'
import HorizontalBarBlock from './HorizontalBarBlock'
import CountriesBlock from './CountriesBlock'

// Demographics Blocks
import SourceBreakdownBlock from '../../modules/demographics/blocks/SourceBreakdownBlock'
import GenderBreakdownBlock from '../../modules/demographics/blocks/GenderBreakdownBlock'

// Features Blocks
import FeaturesOverviewBlock from '../../modules/features/blocks/FeaturesOverviewBlock'
import FeaturesScatterplotBlock from '../../modules/features/blocks/FeaturesScatterplotBlock'
import FeatureBlock from '../../modules/features/blocks/FeatureBlock'

// Tools Blocks
import ToolsOverviewBlock from '../../modules/tools/blocks/ToolsOverviewBlock'
import ToolsSectionOverviewBlock from '../../modules/tools/blocks/ToolsSectionOverviewBlock'
import ToolOpinionBlock from '../../modules/tools/blocks/ToolOpinionBlock'

const blockRegistry = {
    'vertical-bar': VerticalBarBlock,
    'horizontal-bar': HorizontalBarBlock,
    'countries': CountriesBlock,

    'source': SourceBreakdownBlock,
    'gender': GenderBreakdownBlock,

    'features-overview': FeaturesOverviewBlock,
    'features-section-overview': FeaturesScatterplotBlock,
    feature: FeatureBlock,

    'tools-overview': ToolsOverviewBlock,
    'tools-section-overview': ToolsSectionOverviewBlock,
    tool: ToolOpinionBlock
}

export default blockRegistry
