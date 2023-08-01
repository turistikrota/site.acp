import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "reactstrap";
import { usePlaceFilter } from "../hooks/place.filter";

export default function PlaceFilter() {
  const { t } = useTranslation("places");
  const [word, setWord] = useState("");
  const { query, push } = usePlaceFilter();

  useEffect(() => {
    if (!!query.filter.query && query.filter.query !== word) {
      setWord(query.filter.query);
    }
  }, [query]);

  const handleChange = (e) => {
    setWord(e.target.value);
    query.filter.query = e.target.value;
    push(query);
  };
  return (
    <>
      <Input
        id="query"
        name="query"
        type="text"
        className="form-control"
        style={{
          width: "initial",
        }}
        placeholder={t("filter.word")}
        onChange={handleChange}
        value={word}
      />
    </>
  );
}
