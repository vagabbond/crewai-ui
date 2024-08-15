import { useState, useEffect } from 'react';
import { IProject } from '../types/interfaces/project';
import { IAgent } from '../types/interfaces/agent';

type T = IProject | IAgent;
interface IProps {
  itemsPerPage: number;
  items: T[];
  isSort: boolean;
  search: string;
  locationId?: string | null;
}

export const usePagination = ({ itemsPerPage, items, isSort, search, locationId }: IProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentItems, setCurrentItems] = useState<T[]>([]);

  useEffect(() => {
    const filteredItems = items.filter((item) => {
      const result =
        'name' in item
          ? item.name.toLowerCase().includes(search.toLowerCase())
          : item.role.toLowerCase().includes(search.toLowerCase());
      return result;
    });

    const sortedItems = isSort
      ? [...filteredItems].sort((a, b) => {
          let nameA = 'name' in a ? a.name.toLowerCase() : a.role.toLowerCase();
          let nameB = 'name' in b ? b.name.toLowerCase() : b.role.toLowerCase();
          return nameA.localeCompare(nameB);
        })
      : filteredItems;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const result = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

    setCurrentItems(result);
    setTotalPages(Math.ceil(filteredItems.length / itemsPerPage));
    if (result.length === 0 && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
    if (locationId) {
      const item = items.find((item) => item.id === locationId);
      if (item) {
        const index = items.indexOf(item);
        const page = Math.ceil((index + 1) / itemsPerPage);
        setCurrentPage(page);
      }
    }
  }, [currentPage, items, itemsPerPage, isSort, search, locationId]);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return { currentItems, totalPages, currentPage, paginate };
};
