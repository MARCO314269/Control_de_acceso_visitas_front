        <div class="alinear">
        <b-card-text>Selecciona la fecha y hora inicio de tu evento:</b-card-text>
          <div>
            <datetime
                  type="datetime"
                  v-model="inicio"
                  input-class="my-class"
                  value-zone="America/Mexico_City"
                  placeholder="DD-MM-YYYY   00:00"
                  :format="{ day: 'numeric', month: 'numeric', year: 'numeric',  hour: 'numeric', minute: 'numeric'}"
                  :phrases="{ok: 'Continue', cancel: 'Exit'}"
                  :hour-step="1"
                  :minute-step="10"
                  :week-start="7"
                  use12-hour
                  auto
              ></datetime>
              <br>
        <b-card-text>Selecciona la fecha y hora fin de tu evento:</b-card-text>
          <div>
            <datetime
                  type="datetime"
                  v-model="fin"
                  input-class="my-class"
                  value-zone="America/Mexico_City"
                  placeholder="DD-MM-YYYY   00:00"
                  :format="{ day: 'numeric', month: 'numeric', year: 'numeric',  hour: 'numeric', minute: 'numeric'}"
                  :phrases="{ok: 'Continue', cancel: 'Exit'}"
                  :hour-step="1"
                  :minute-step="10"
                  :week-start="7"
                  use12-hour
                  auto
              ></datetime>
        </div>
        <div class="form-group row mt-4">
          <div class="col text-center" >
              <button 
                type="button" 
                id="button" 
                data-toggle="modal" 
                class="btn btn-success" 
                @click="submition"
                >Registar</button>
          </div>
        </div>
    </div>
</div>