export const bucketsMapping = {
    "👍 I've used it": 'used_it',
    "✅ Know what it is, but haven't used it": 'know_not_used',
    '🤷 Never heard of it/Not sure what it is': 'never_heard_not_sure'
}

export const mapFeatureBuckets = buckets =>
    buckets.reduce(
        (acc, bucket) => ({
            ...acc,
            [bucketsMapping[bucket.id]]: bucket.count
        }),
        {}
    )

export const mergeFeaturesResources = (features, resources) => {
    return features.map(feature => {
        return {
            ...feature,
            usage: mapFeatureBuckets(feature.buckets),
            resources: resources.find(r => r.id === feature.id) || {}
        }
    })
}