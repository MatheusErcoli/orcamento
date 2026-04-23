import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import FormOrcamento from "@/components/FormOrcamento";

afterEach(() => {
  cleanup();
});

describe("FormOrcamento", () => {

  test("renderiza os campos principais", () => {
    render(<FormOrcamento />);

    expect(
      screen.getAllByPlaceholderText("Digite nome do cliente...")[0]
    ).toBeInTheDocument();

    expect(
      screen.getAllByText("Salvar Orçamento")[0]
    ).toBeInTheDocument();
  });

  test("permite digitar no campo cliente", async () => {
    render(<FormOrcamento />);

    const input = screen.getAllByPlaceholderText("Digite nome do cliente...")[0];

    await userEvent.type(input, "Matheus");

    expect(input).toHaveValue("Matheus");
  });

  test("adiciona produto na lista", async () => {
    render(<FormOrcamento />);

    const select = screen.getAllByRole("combobox")[0];
    const botaoAdicionar = screen.getAllByText("Adicionar")[0];

    await userEvent.selectOptions(select, "1");
    await userEvent.click(botaoAdicionar);

    expect(screen.getAllByText(/Produto A/i)[0]).toBeInTheDocument();
  });

});