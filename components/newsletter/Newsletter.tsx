import { BUTTON_VARIANTS, ButtonVariant } from "../minicart/Cart.tsx";
import { Runtime } from "../../runtime.ts";
import { useSignal } from "@preact/signals";

const subscribe = Runtime.create("../../actions/vtex/newsletter/subscribe.ts");

export interface INewsletterInputProps {
  /**
   * @title Hide input?
   */
  show?: boolean;
  /**
   * @title placeholder
   */
  placeholder?: string;
}

export interface INewsletterFormProps {
  email: INewsletterInputProps;
  name: INewsletterInputProps;
  button: {
    /**
     * @title button variant
     * @default primary
     */
    variant?: ButtonVariant;
    /**
     * @title button label?
     * @default cadastrar
     */
    label?: string;
  };
}

export interface Props {
  /**
   * @title Newsletter Form
   */
  form: INewsletterFormProps;
  /**
   * @title newsletter message text?
   * @format html
   */
  text: string;
}

interface InputNewsletterProps {
  name: string;
  placeholder: string;
  type: string;
  required: boolean;
}

function InputNewsletter(
  { name, placeholder, required, type }: InputNewsletterProps,
) {
  return (
    <input
      name={name}
      type={type}
      class="input lg:h-12 h-9 px-5 join-item w-full rounded-full placeholder:text-placeholder outline-none lg:text-base text-xs"
      placeholder={placeholder}
      required={required}
    />
  );
}

function Form(props: Props) {
  const { text, form } = props;
  const loading = useSignal(false);
  const success = useSignal(false);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    try {
      loading.value = true;

      // Fazer o type cast para HTMLFormElement
      const formElement = e.currentTarget as HTMLFormElement;

      const email =
        (formElement.elements.namedItem("email") as HTMLInputElement)?.value;

      let name = "";

      // Verifique se o campo 'name' deve ser exibido e existe no formulário
      if (form.name.show) {
        name =
          (formElement.elements.namedItem("name") as HTMLInputElement)?.value ||
          "";
      }

      if (email && name) {
        await subscribe({ email, name });
      }
    } finally {
      loading.value = false;
      success.value = true;

      setTimeout(() => {
        success.value = false;
      }, 5000);
    }
  };

  const emailInput = form?.email?.show !== false && (
    <InputNewsletter
      name="email"
      required
      type="email"
      placeholder={form?.email?.placeholder || "E-mail"}
    />
  );

  const nameInput = form?.name?.show !== false && (
    <InputNewsletter
      name="name"
      type="text"
      placeholder={form?.name?.placeholder || "Nome"}
      required
    />
  );

  return (
    <div class="flex flex-col lg:flex-row items-baseline lg:items-center gap-5 lg:gap-16 py-10 w-full justify-between">
      <div
        dangerouslySetInnerHTML={{ __html: text }}
        class="text-base lg:text-xl text-left text-base-100 lg:max-w-sm max-w-xs lg:pr-0 pr-14"
      />
      {success.value
        ? (
          <div class="text-base lg:text-xl text-left text-base-100">
            E-mail cadastrado com sucesso!
          </div>
        )
        : (
          <form class="w-full form-control" onSubmit={handleSubmit}>
            <div class="flex gap-4 w-full lg:flex-row flex-col items-center lg:justify-between justify-center">
              {nameInput}
              {emailInput}
              <button
                style={{
                  minWidth: "150px",
                }}
                type="submit"
                class={`capitalize md:ml-5 font-medium btn disabled:loading rounded-full join-item btn-${
                  BUTTON_VARIANTS[form?.button?.variant as string] ||
                  BUTTON_VARIANTS["primary"]
                }`}
                disabled={loading.value}
              >
                {form?.button?.label || "Cadastrar"}
              </button>
            </div>
          </form>
        )}
    </div>
  );
}

export default Form;
