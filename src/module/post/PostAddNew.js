import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Dropdown } from "components/dropdown";
import { Field } from "components/field";
import ImageUpLoad from "components/imageUpload/ImageUpLoad";
import { Input } from "components/input";
import { Label } from "components/label";
import Toggle from "components/toggle/Toggle";
import { db } from "firebase-app/firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import useFirebaseImage from "hooks/useFirebaseImage";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import styled from "styled-components";
import { postStatus } from "utils/constants";

const PostAddNewStyles = styled.div``;

const PostAddNew = () => {
  const [categories, setCategories] = useState([]);
  const { control, watch, setValue, handleSubmit, getValues } = useForm({
    mode: "onChange",
    defaultValues: {
      status: 2,
      category: "",
      title: "",
      slug: "",
      hot: false,
    },
  });
  const {
    urlImage,
    progress,
    handleDeleteImage,
    handleSelectImage,
    handleUploadImage,
  } = useFirebaseImage(setValue, getValues);

  const watchStatus = watch("status");
  const watchHot = watch("hot");

  const addPostHandler = async (values) => {
    const cloneValues = { ...values };
    cloneValues.slug = slugify(values.slug || values.title);
    cloneValues.status = Number(values.status);
    console.log("addPostHandler ~ cloneValues", cloneValues);
    handleUploadImage(cloneValues.image);
  };
  useEffect(() => {
    async function getCategories() {
      const colRef = collection(db, "categories");
      const q = query(colRef, where("status", "==", 1));
      const querySnapShot = await getDocs(q);
      let result = [];
      querySnapShot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategories(result);
    }
    getCategories();
  }, []);
  return (
    <PostAddNewStyles>
      <h1 className="dashboard-heading">Add new post</h1>
      <form onSubmit={handleSubmit(addPostHandler)}>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Title</Label>
            <Input
              control={control}
              placeholder="Enter your title"
              name="title"
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              placeholder="Enter your slug"
              name="slug"
            ></Input>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Status</Label>
            <div className="flex items-center gap-x-5">
              <Radio
                key={postStatus.APPROVED}
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.APPROVED}
                value={postStatus.APPROVED}
              >
                APPROVED
              </Radio>
              <Radio
                key={postStatus.PENDING}
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.PENDING}
                value={postStatus.PENDING}
              >
                PENDING
              </Radio>
              <Radio
                key={postStatus.REJECT}
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.REJECT}
                value={postStatus.REJECT}
              >
                REJECT
              </Radio>
            </div>
          </Field>
          <Field>
            <Label>Image</Label>
            <ImageUpLoad
              name="image"
              srcImage={urlImage}
              onChange={handleSelectImage}
              handleDeleteImage={handleDeleteImage}
              progress={progress}
            />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Author</Label>
            <Input control={control} placeholder="Find the author"></Input>
          </Field>
          <Field>
            <Label>Feature post</Label>
            <Toggle
              on={watchHot === true}
              onClick={() => setValue("hot", !watchHot)}
            />
          </Field>
          <Field>
            <Label>Category</Label>
            <Dropdown>
              {categories?.map((item) => (
                <Dropdown.Option key={item.id}>{item.name}</Dropdown.Option>
              ))}
            </Dropdown>
          </Field>
        </div>
        <Button type="submit" className="mx-auto">
          Add new post
        </Button>
      </form>
    </PostAddNewStyles>
  );
};

export default PostAddNew;
