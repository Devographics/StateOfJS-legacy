// Generic Blocks
import VerticalBarBlock from './VerticalBarBlock'
import HorizontalBarBlock from './HorizontalBarBlock'

// Demographics Blocks
import SourceBreakdownBlock from '../../modules/demographics/blocks/SourceBreakdownBlock'
import GenderBreakdownBlock from '../../modules/demographics/blocks/GenderBreakdownBlock'

// Features Blocks
import FeaturesScatterplotBlock from '../../modules/features/blocks/FeaturesScatterplotBlock'
import FeatureBlock from '../../modules/features/blocks/FeatureBlock'

// Tools Blocks
import ToolOverviewBlock from '../../modules/tools/blocks/ToolOverviewBlock'
import ToolOpinionBlock from '../../modules/tools/blocks/ToolOpinionBlock'

const blockRegistry = {
    'vertical-bar': VerticalBarBlock,
    'horizontal-bar': HorizontalBarBlock,

    'source': SourceBreakdownBlock,
    'gender': GenderBreakdownBlock,

    'feature-overview': FeaturesScatterplotBlock,
    feature: FeatureBlock,

    'tool-overview': ToolOverviewBlock,
    tool: ToolOpinionBlock
}

export default blockRegistry
