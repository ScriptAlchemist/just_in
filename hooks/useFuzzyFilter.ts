import React from 'react';

export const useFuzzyFilter = <T>(items: T[], propsToInclude: (keyof T)[], initialFilter: string = '') => {
  const [filter, setFilter] = React.useState<string>(initialFilter);

  const filteredItems = items.filter((item) => {
    return propsToInclude.some((prop) => {
      const value = item[prop];
      return value && value.toString().toLowerCase().includes(filter.toLowerCase());
    });
  });

  return [filteredItems, setFilter, filter] as const;
};

