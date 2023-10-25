import { deepEqual } from "@/utils/deepEqual";
import debounce from "@turistikrota/ui/utils/debounce";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export const getQueryByKeyBindings = (searchParams) => {
  const query = { filter: {} };
  const keyBindings = {
    page: (value) => {
      const val = parseInt(value);
      if (!isNaN(val)) {
        query.page = val;
      }
    },
    limit: (value) => {
      const val = parseInt(value);
      if (!isNaN(val)) {
        query.limit = val;
      }
    },
    lat: (value) => {
      let lng = searchParams.get("lng");
      if (lng) {
        const lat = parseFloat(value);
        const lng2 = parseFloat(lng);
        if (!isNaN(lat) && !isNaN(lng2)) {
          query.filter.coordinates = [lat, lng2];
        }
      }
    },
    lng: (value) => {
      let lat = searchParams.get("lat");
      if (lat) {
        const lng = parseFloat(value);
        const lat2 = parseFloat(lat);
        if (!isNaN(lng) && !isNaN(lat2)) {
          query.filter.coordinates = [lat2, lng];
        }
      }
    },
    features: (value) => {
      query.filter.featureUUIDs = value.split(",");
    },
    types: (value) => {
      const list = value.split(",");
      const types = list.filter((type) => isPlaceType(type));
      if (types.length > 0) {
        query.filter.types = types;
      }
    },
    pay: (value) => {
      if (["on", "off"].includes(value)) {
        query.filter.isPayed = value === "on";
      }
    },
    dist: (value) => {
      const val = parseInt(value);
      if (!isNaN(val)) {
        query.filter.distance = val;
      }
    },
    time: (value) => {
      const [min, max] = value.split(",");
      const minVal = parseInt(min);
      const maxVal = parseInt(max);
      if (!isNaN(minVal) && !isNaN(maxVal) && minVal < maxVal) {
        query.filter.timeSpent = {
          min: minVal,
          max: maxVal,
        };
      }
    },
    minRev: (value) => {
      const val = parseInt(value);
      if (!isNaN(val)) {
        query.filter.minReview = val;
      }
    },
    maxRev: (value) => {
      const val = parseInt(value);
      if (!isNaN(val)) {
        query.filter.maxReview = val;
      }
    },
    minPoint: (value) => {
      const val = parseInt(value);
      if (!isNaN(val)) {
        query.filter.minAveragePoint = val;
      }
    },
    maxPoint: (value) => {
      const val = parseInt(value);
      if (!isNaN(val)) {
        query.filter.maxAveragePoint = val;
      }
    },
    q: (value) => {
      query.filter.query = value;
    },
    sort: (value) => {
      if (Sorts.includes(value)) {
        query.filter.sort = value;
        return;
      }
      query.filter.sort = undefined;
    },
    order: (value) => {
      if (Orders.includes(value)) {
        query.filter.order = value;
        return;
      }
      query.filter.order = undefined;
    },
  };
  searchParams.forEach((value, key) => {
    if (Object.keys(keyBindings).includes(key)) {
      keyBindings[key](value);
    }
  });
  return query;
};

export const placeQueryToURL = (query) => {
  const q = new URLSearchParams();
  if (query.page) {
    q.append("page", query.page.toString());
  }
  if (query.limit) {
    q.append("limit", query.limit.toString());
  }
  return q.toString();
};

export const placeToQuery = (place) => {
  const query = new URLSearchParams();
  if (place.page) {
    query.append("page", place.page.toString());
  }
  if (place.limit) {
    query.append("limit", place.limit.toString());
  }
  if (place.filter.coordinates) {
    const [lat, lng] = place.filter.coordinates;
    query.append("lat", lat.toString());
    query.append("lng", lng.toString());
  }
  if (place.filter.featureUUIDs) {
    query.append("features", place.filter.featureUUIDs.join(","));
  }
  if (place.filter.types) {
    query.append("types", place.filter.types.join(","));
  }
  if (place.filter.isPayed !== undefined) {
    query.append("pay", place.filter.isPayed ? "on" : "off");
  }
  if (place.filter.distance) {
    query.append("dist", place.filter.distance.toString());
  }
  if (place.filter.timeSpent) {
    const { min, max } = place.filter.timeSpent;
    query.append("time", `${min},${max}`);
  }
  if (place.filter.minReview) {
    query.append("minRev", place.filter.minReview.toString());
  }
  if (place.filter.maxReview) {
    query.append("maxRev", place.filter.maxReview.toString());
  }
  if (place.filter.minAveragePoint) {
    query.append("minPoint", place.filter.minAveragePoint.toString());
  }
  if (place.filter.maxAveragePoint) {
    query.append("maxPoint", place.filter.maxAveragePoint.toString());
  }
  if (place.filter.query) {
    query.append("q", place.filter.query);
  }
  if (place.filter.sort) {
    query.append("sort", place.filter.sort);
  }
  if (place.filter.order) {
    query.append("order", place.filter.order);
  }
  return query.toString();
};

export const usePlaceFilter = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(getQueryByKeyBindings(searchParams));
  const [lastQuery, setLastQuery] = useState(query);
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  const debouncedPush = debounce((path, cb) => {
    const url = `${pathname}?${path}`;
    navigate(url);
    if (cb) cb();
  }, 500);

  const cleaner = (cb) => {
    debouncedPush("", cb);
  };

  const push = (query, cb) => {
    const path = placeToQuery(query);
    debouncedPush(path, cb);
  };

  useEffect(() => {
    if (lastQuery && deepEqual(lastQuery, query)) return;
    setLastQuery(query);
  }, [query]);

  useEffect(() => {
    const newQuery = getQueryByKeyBindings(searchParams);
    if (placeToQuery(query) === placeToQuery(newQuery)) return;
    setQuery(newQuery);
  }, [searchParams]);

  return {
    query,
    isQueryChanged: lastQuery !== null && !deepEqual(lastQuery, query),
    isFiltered: Object.keys(query.filter).length > 0,
    clean: cleaner,
    push,
  };
};

export const Sorts = ["most_recent", "nearest"];
export const Orders = ["asc", "desc"];

export const usePlaceSort = () => {
  return {
    defaultSort: Sorts[0],
    defaultOrder: Orders[0],
    orders: Orders,
    sorts: Sorts,
  };
};
