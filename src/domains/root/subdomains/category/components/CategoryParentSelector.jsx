import { Services, apiUrl } from "@/config/service";
import { useQuery } from "@/hooks/query";
import { httpClient } from "@/http/client";
import { makeCustomSelect } from "@/utils/customSelect";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import { Col } from "reactstrap";
import CategoryParentList from "./CategoryParentList";

const CategoryParentSelector = ({ onChange, parents, currentId }) => {
  const { t, i18n } = useTranslation("categories");
  const [childs, setChilds] = useState({});
  const [loading, setLoading] = useState(false);
  const { data: mainCategories, isLoading } = useQuery(
    apiUrl(Services.Category, `/admin`),
    {
      cache: true,
      params: {},
    }
  );

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  const onCategorySelect = async (category) => {
    if (childs[category.value] === undefined) {
      await findChildCategories(category.value);
    }
    onChange(category);
  };

  const findChildCategories = async (parentId) => {
    setLoading(true);
    const res = await httpClient.get(
      apiUrl(Services.Category, `/admin/${parentId}/child`)
    );
    setLoading(false);
    if (res.status === 200 && res.data) {
      setChilds({
        ...childs,
        [parentId]: res.data.list,
      });
    }
  };

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
            onChange={onCategorySelect}
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
                options={childs[parent.uuid].map((category) => ({
                  value: category.uuid,
                  label: category.meta[i18n.language].name,
                }))}
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
