exports.salaryRanges = [
    {
        id: 'work_for_free',
        label: 'I work for free :(',
        average: 0
    },
    {
        id: '0_10',
        label: '$0-$10k',
        average: 5
    },
    {
        id: '10_30',
        label: '$10k-$30k',
        aliases: ['$10-$30k'],
        average: 20
    },
    {
        id: '30_50',
        label: '$30k-$50k',
        aliases: ['$30-50k'],
        average: 40
    },
    {
        id: '50_100',
        label: '$50k-$100k',
        aliases: ['$50-$100k'],
        average: 75
    },
    {
        id: '100_200',
        label: '$100k-$200k',
        average: 150
    },
    {
        id: 'more_than_200',
        label: '$200k+',
        average: 250
    }
]

exports.salaryRangeByLabel = exports.salaryRanges.reduce((acc, salaryRange) => {
    const mapping = {
        ...acc,
        [salaryRange.label]: salaryRange
    }

    if (salaryRange.aliases !== undefined) {
        salaryRange.aliases.forEach(alias => {
            mapping[alias] = salaryRange
        })
    }

    return mapping
}, {})

exports.companySizes = [
    {
        id: '1',
        label: 'Just me'
    },
    {
        id: '1_5',
        label: '1-5 people'
    },
    {
        id: '5_10',
        label: '5-10 people'
    },
    {
        id: '10_20',
        label: '10-20 people'
    },
    {
        id: '20_50',
        label: '20-50 people'
    },
    {
        id: '50_100',
        label: '50-100 people'
    },
    {
        id: '100_1000',
        label: '100-1000 people'
    },
    {
        id: 'more_than_1000',
        label: '1000+ people'
    }
]

exports.companySizeByLabel = exports.companySizes.reduce(
    (acc, companySize) => ({
        ...acc,
        [companySize.label]: companySize
    }),
    {}
)

exports.yearsOfExperienceRanges = [
    {
        id: 'less_than_1',
        label: 'Less than one year'
    },
    {
        id: '1_2',
        label: '1-2 years'
    },
    {
        id: '2_5',
        label: '2-5 years'
    },
    {
        id: '5_10',
        label: '5-10 years'
    },
    {
        id: '10_20',
        label: '10-20 years'
    },
    {
        id: 'more_than_20',
        label: '20+ years'
    }
]

exports.yearsOfExperienceRangeByLabel = exports.yearsOfExperienceRanges.reduce(
    (acc, yearsOfExperienceRange) => ({
        ...acc,
        [yearsOfExperienceRange.label]: yearsOfExperienceRange
    }),
    {}
)
