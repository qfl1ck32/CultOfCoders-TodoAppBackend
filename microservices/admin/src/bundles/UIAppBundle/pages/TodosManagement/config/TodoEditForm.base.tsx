/** @overridable */
import { XRouter, use, IComponents, QueryBodyType } from "@bluelibs/x-ui";
import { XForm } from "@bluelibs/x-ui-admin";
import { Service, Inject } from "@bluelibs/core";
import { SmileOutlined } from "@ant-design/icons";
import { Routes } from "@bundles/UIAppBundle";
import * as Ant from "antd";
import {
  Todo,
  UsersCollection,
  TodosCollection,
} from "@bundles/UIAppBundle/collections";

@Service({ transient: true })
export class TodoEditForm extends XForm {
  @Inject(() => TodosCollection)
  collection: TodosCollection;

  build() {
    const { UIComponents } = this;
    const { t } = this.i18n;

    this.add([
      {
        id: "title",
        label: t("management.todos.fields.title"),
        name: ["title"],
        required: true,
        component: Ant.Input,
      },

      {
        id: "description",
        label: t("management.todos.fields.description"),
        name: ["description"],
        component: Ant.Input,
      },

      {
        id: "isDone",
        label: t("management.todos.fields.isDone"),
        name: ["isDone"],
        required: true,
        render: (props) => (
          <Ant.Form.Item {...props}>
            <Ant.Radio.Group>
              <Ant.Radio value={false} key={0}>
                No
              </Ant.Radio>
              <Ant.Radio value={true} key={1}>
                Yes
              </Ant.Radio>
            </Ant.Radio.Group>
          </Ant.Form.Item>
        ),
      },

      {
        id: "deadline",
        label: t("management.todos.fields.deadline"),
        name: ["deadline"],
        render: (props) => (
          <Ant.Form.Item {...props}>
            <UIComponents.DatePicker required={false} />
          </Ant.Form.Item>
        ),
      },

      {
        id: "index",
        label: t("management.todos.fields.index"),
        name: ["index"],
        required: true,
        component: Ant.InputNumber,
      },
    ]);
  }

  static getRequestBody(): QueryBodyType<Todo> {
    return {
      _id: 1,
      title: 1,
      description: 1,
      isDone: 1,
      deadline: 1,
      index: 1,
    };
  }

  onSubmit(_id, values: Partial<Todo>): Promise<void> {
    const { t } = this.i18n;

    return this.collection
      .updateOne(_id, { $set: values })
      .then(({ _id }) => {
        Ant.notification.success({
          message: t("generics.success"),
          description: t("management.todos.edit_confirmation"),
          icon: <SmileOutlined />,
        });
      })
      .catch((err) => {
        Ant.notification.warn({
          message: t("generics.error"),
          description: t("generics.error_message"),
        });
      });
  }
}
