const form = `
<form class="form" name="form">
  <div class="form__fields">
    <div class="field-group">
      <div class="field">
        <label for="installments">Número de parcelas</label>
        <select name="Parcelas" id="installments" required>
          <option value="24">24</option>
          <option value="36">36</option>
          <option value="48">48</option>
        </select>
      </div>
      <div class="field">
        <label for="warranty">Garantia</label>
        <select name="Garantia" id="warranty" required>
          <option value="Veículo" name="Veículo" data-name="vehicle">Veículo</option>
          <option value="Imóvel" name="Imóvel" data-name="property">Imóvel</option>
        </select>
      </div>
    </div>
    <div class="warranty-amount">
      <div class="field-group">
        <div class="field">
          <label for="warranty-amount">Valor da Garantia</label>
          <input type="text" name="Valor de garantia" id="warranty-amount" value="3750" data-name="warranty-amount" required/>
        </div>
        <div class="field">
          <div class="range">
            <input type="range" name="Range de garantia" id="warranty-amount-range" min="3750" max="12500" value="20" step="10">
            <div class="range__values">
              <span class="warranty-amount__range--min">R$ 3.750,00</span>
              <span class="warranty-amount__range--max">R$ 125.000,00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="loan-amount">
      <div class="field-group">
        <div class="field">
          <label for="loan-amount">Valor do Empréstimo</label>
          <input type="text" name="Valor do Empréstimo" id="loan-amount" value="3000" data-name="loan-amount" required>
        </div>
        <div class="field">
          <div class="range">
            <input type="range" name="Range empréstimo" id="loan-amount-range" min="3000" max="100000" value="90" step="10">
            <div class="range__values">
              <span>R$ 3.000,00</span>
              <span>R$ 100.000,00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="summary">
    <div class="summary__quota">
      <h4>Valor da Parcela</h4>
      <div class="quota">
        <span><strong>R$</strong> 138,90</span>
      </div>
    </div>
    <div class="summary__total">
      <h4>Total a pagar</h4>
      <p>R$ 3.333,60</p>
    </div>
    <div class="tax__container">
      <h4>Taxa de juros (mês)</h4>
      <p>2.34%</p>
    </div>
    <button class="button">Solicitar</button>
  </div>
</form>
`
export default form
