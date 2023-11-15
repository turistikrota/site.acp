import { Services, apiUrl } from "@/config/service";
import { useQuery } from "@/hooks/query";
import { httpClient } from "@/http/client";
import { makeCustomSelect } from "@/utils/customSelect";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import { Col } from "reactstrap";
import CategoryParentList from "./CategoryParentList";

const CategoryParentSelector = ({
  onChange,
  parents,
  setLoading,
  onMainChange,
  currentId = null,
}) => {
  const { t, i18n } = useTranslation("categories");
  const [childs, setChilds] = useState({});
  const { data: mainCategories, isLoading } = useQuery(
    apiUrl(Services.Category, `/admin?only_mains=true`),
    {
      cache: true,
      params: {},
    }
  );

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  const onMainCategorySelect = async (category) => {
    onMainChange(category);
    setChilds({});
    if (childs[category.value] === undefined) {
      await findChildCategories(category.value);
    }
  };

  const onCategorySelect = async (category) => {
    if (childs[category.value] === undefined) {
      await findChildCategories(category.value);
    }
    onChange(category);
  };

  const getChildCategories = async (parentId) => {
    setLoading(true);
    const res = await httpClient.get(
      apiUrl(Services.Category, `/admin/${parentId}/child`)
    );
    setLoading(false);
    if (res.status === 200 && res.data) {
      return res.data.list.filter((p) => p.uuid !== currentId);
    }
    return [];
  };

  const findChildCategories = async (parentId) => {
    const list = await getChildCategories(parentId);
    setChilds({
      ...childs,
      [parentId]: list,
    });
  };
  const findFirstSelectedCategory = (parents, categories) => {
    const category = parents.find((parent) =>
      categories.find(
        (category) =>
          category.uuid === parent.uuid && category.uuid !== currentId
      )
    );
    return category
      ? {
          value: category.uuid,
          label: category.name,
        }
      : null;
  };

  const findAllChildCategories = async (parentIds) => {
    const list = await Promise.all(
      parentIds.map((parentId) => getChildCategories(parentId.uuid))
    );
    const newChilds = {};
    list.forEach((childList, index) => {
      newChilds[parentIds[index].uuid] = childList;
    });
    setChilds(newChilds);
  };

  useEffect(() => {
    findAllChildCategories(parents);
  }, [parents]);

  return (
    <>
      <Col xs={12}>
        <CategoryParentList parents={parents} />
      </Col>
      {mainCategories && mainCategories.list.length > 0 && (
        <Col xs={12}>
          <Select
            classNamePrefix="select2-selection"
            placeholder={t("form.parent.select.placeholder")}
            title={t("form.parent.select.title")}
            options={mainCategories.list.map((category) => ({
              value: category.uuid,
              label: category.meta[i18n.language].name,
            }))}
            value={findFirstSelectedCategory(parents, mainCategories.list)}
            onChange={onMainCategorySelect}
            theme={makeCustomSelect}
          />
        </Col>
      )}
      {Object.keys(childs).length > 0 && (
        <Col xs={12}>
          {parents.map((parent) =>
            childs[parent.uuid] && childs[parent.uuid].length > 0 ? (
              <Select
                key={parent.uuid}
                className="mt-3"
                classNamePrefix="select2-selection"
                placeholder={t("form.child.select.placeholder")}
                title={t("form.child.select.title")}
                options={childs[parent.uuid].map((category) => ({
                  value: category.uuid,
                  label: category.meta[i18n.language].name,
                }))}
                value={findFirstSelectedCategory(parents, childs[parent.uuid])}
                onChange={onCategorySelect}
              />
            ) : null
          )}
        </Col>
      )}
    </>
  );
};

export default CategoryParentSelector;
