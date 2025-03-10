import { useState, useEffect } from 'react';

export const useFilters = (searchParams) => {
    const [filters, setFilters] = useState({
        categories: [],
        kinds: '',
        priceRange: 2000,
        sortBy: 'normal',
        Symbol: '',
        searchText: ''
    });

    useEffect(() => {
        const type = searchParams.get('type');
        const kinds = searchParams.get('kinds');
        const title = searchParams.get('title');
        const searchText = searchParams.get('searchText');

        if (!type && !kinds && !title && !searchText) return;

        setFilters(prev => ({
            ...prev,
            kinds: kinds || '',
            Symbol: type || '',
            categories: title ? title : [],
            searchText: search || ''
        }));
        console.log(filters);
        return () => {
            setFilters({
                categories: [],
                kinds: '',
                priceRange: 2000,
                sortBy: 'normal',
                Symbol: '',
                searchText: ''
            });
        };
    }, [searchParams]);

    const handleFilterChange = (filterType, value, checked) => {
        setFilters(prev => {
            if (filterType === 'categories') {
                return {
                    ...prev,
                    [filterType]: checked
                        ? [...prev[filterType], value]
                        : prev[filterType].filter(item => item !== value)
                };
            }
            return {
                ...prev,
                [filterType]: value
            };
        });
    };

    return { filters, handleFilterChange };
};