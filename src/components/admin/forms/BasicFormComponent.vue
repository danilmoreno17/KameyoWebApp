<template>
  <div id="main-content">
    <div class="container-fluid">
      <div class="block-header">
        <bread-crumb></bread-crumb>
      </div>
      <div class="row clearfix">
        <div class="col-lg-6 col-md-12">
          <div class="card">
            <div class="header">
              <h2>Basic example</h2>
            </div>
            <div class="body">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">@</span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>

              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Recipient's username"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <div class="input-group-append">
                  <span class="input-group-text" id="basic-addon2"
                    >@example.com</span
                  >
                </div>
              </div>

              <label for="basic-url">Your vanity URL</label>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon3"
                    >https://example.com/users/</span
                  >
                </div>
                <input
                  type="text"
                  class="form-control"
                  id="basic-url"
                  aria-describedby="basic-addon3"
                />
              </div>

              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">$</span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  aria-label="Amount (to the nearest dollar)"
                />
                <div class="input-group-append">
                  <span class="input-group-text">.00</span>
                </div>
              </div>

              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">With textarea</span>
                </div>
                <textarea
                  class="form-control"
                  aria-label="With textarea"
                ></textarea>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="header">
              <h2>Different Sizing</h2>
            </div>
            <div class="body">
              <div class="input-group input-group-sm mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-sm"
                    >Small</span
                  >
                </div>
                <input
                  type="text"
                  class="form-control"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                />
              </div>

              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-default"
                    >Default</span
                  >
                </div>
                <input
                  type="text"
                  class="form-control"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                />
              </div>

              <div class="input-group input-group-lg">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-lg"
                    >Large</span
                  >
                </div>
                <input
                  type="text"
                  class="form-control"
                  aria-label="Large"
                  aria-describedby="inputGroup-sizing-sm"
                />
              </div>
            </div>
          </div>
          <div class="card">
            <div class="header">
              <h2>Input with Checkboxes and radios</h2>
            </div>
            <div class="body">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <div class="input-group-text">
                    <input
                      type="checkbox"
                      aria-label="Checkbox for following text input"
                    />
                  </div>
                </div>
                <input
                  type="text"
                  class="form-control"
                  aria-label="Text input with checkbox"
                />
              </div>

              <div class="input-group">
                <div class="input-group-prepend">
                  <div class="input-group-text">
                    <input
                      type="radio"
                      aria-label="Radio button for following text input"
                    />
                  </div>
                </div>
                <input
                  type="text"
                  class="form-control"
                  aria-label="Text input with radio button"
                />
              </div>
            </div>
          </div>
          <div class="card">
            <div class="header">
              <h2>
                Multiple addons
                <small
                  >Multiple add-ons are supported and can be mixed with checkbox
                  and radio input versions.</small
                >
              </h2>
            </div>
            <div class="body">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">$</span>
                  <span class="input-group-text">0.00</span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  aria-label="Amount (to the nearest dollar)"
                />
              </div>

              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  aria-label="Amount (to the nearest dollar)"
                />
                <div class="input-group-append">
                  <span class="input-group-text">$</span>
                  <span class="input-group-text">0.00</span>
                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="header">
              <h2>Custom Checkboxes and Radio Buttons</h2>
            </div>
            <div class="body">
              <div class="row">
                <div class="col-lg-6 col-md-12">
                  <div class="fancy-checkbox">
                    <label
                      ><input type="checkbox" /><span
                        >Fancy Checkbox 1</span
                      ></label
                    >
                  </div>
                  <div class="fancy-checkbox">
                    <label
                      ><input type="checkbox" checked /><span
                        >Fancy Checkbox 2</span
                      ></label
                    >
                  </div>
                  <div class="fancy-checkbox">
                    <label
                      ><input type="checkbox" /><span
                        >Fancy Checkbox 3</span
                      ></label
                    >
                  </div>
                </div>
                <div class="col-lg-6 col-md-12">
                  <div class="fancy-radio">
                    <label
                      ><input
                        name="gender"
                        value="male"
                        type="radio"
                        checked
                      /><span><i></i>Male</span></label
                    >
                  </div>
                  <div class="fancy-radio">
                    <label
                      ><input name="gender" value="female" type="radio" /><span
                        ><i></i>Female</span
                      ></label
                    >
                  </div>
                  <br />
                  <label class="fancy-radio"
                    ><input name="gender2" value="male" type="radio" /><span
                      ><i></i>Male</span
                    ></label
                  >
                  <label class="fancy-radio"
                    ><input
                      name="gender2"
                      value="female"
                      type="radio"
                      checked
                    /><span><i></i>Female</span></label
                  >
                  <br />
                  <label class="fancy-radio custom-color-green"
                    ><input
                      name="gender3"
                      value="male"
                      type="radio"
                      checked
                    /><span><i></i>Male</span></label
                  >
                  <label class="fancy-radio custom-color-green"
                    ><input name="gender3" value="female" type="radio" /><span
                      ><i></i>Female</span
                    ></label
                  >
                  <br />
                  <label class="fancy-radio custom-color-green"
                    ><input name="gender4" value="male" type="radio" /><span
                      ><i></i>Male</span
                    ></label
                  >
                  <label class="fancy-radio custom-color-green"
                    ><input
                      name="gender4"
                      value="female"
                      type="radio"
                      checked
                    /><span><i></i>Female</span></label
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-md-12">
          <div class="card">
            <div class="header">
              <h2>Input Button addons</h2>
            </div>
            <div class="body">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <button class="btn btn-outline-secondary" type="button">
                    Button
                  </button>
                </div>
                <input
                  type="text"
                  class="form-control"
                  placeholder=""
                  aria-label=""
                  aria-describedby="basic-addon1"
                />
              </div>

              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Recipient's username"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" type="button">
                    Button
                  </button>
                </div>
              </div>

              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <button class="btn btn-outline-secondary" type="button">
                    Button
                  </button>
                  <button class="btn btn-outline-secondary" type="button">
                    Button
                  </button>
                </div>
                <input
                  type="text"
                  class="form-control"
                  placeholder=""
                  aria-label=""
                  aria-describedby="basic-addon1"
                />
              </div>

              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Recipient's username"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" type="button">
                    Button
                  </button>
                  <button class="btn btn-outline-secondary" type="button">
                    Button
                  </button>
                </div>
              </div>
            </div>
            <div class="body">
              <h6>Input Button dropdowns</h6>
              <div class="input-group mb-3">
                <div
                  class="input-group-prepend"
                  v-bind:class="{ show: dropdown1 }"
                  @click="dropdown1 = !dropdown1"
                  v-click-outside="dropdown1Outside"
                >
                  <button
                    class="btn btn-outline-secondary dropdown-toggle"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Dropdown
                  </button>
                  <div class="dropdown-menu" v-bind:class="{ show: dropdown1 }">
                    <a class="dropdown-item" href="javascript:void(0);"
                      >Action</a
                    >
                    <a class="dropdown-item" href="javascript:void(0);"
                      >Another action</a
                    >
                    <a class="dropdown-item" href="javascript:void(0);"
                      >Something else here</a
                    >
                    <div role="separator" class="dropdown-divider"></div>
                    <a class="dropdown-item" href="javascript:void(0);"
                      >Separated link</a
                    >
                  </div>
                </div>
                <input
                  type="text"
                  class="form-control"
                  aria-label="Text input with dropdown button"
                />
              </div>

              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  aria-label="Text input with dropdown button"
                />
                <div
                  class="input-group-append"
                  v-bind:class="{ show: dropdown2 }"
                  @click="dropdown2 = !dropdown2"
                  v-click-outside="dropdown2Outside"
                >
                  <button
                    class="btn btn-outline-secondary dropdown-toggle"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Dropdown
                  </button>
                  <div
                    class="dropdown-menu dropdown-right"
                    v-bind:class="{ show: dropdown2 }"
                  >
                    <a class="dropdown-item" href="javascript:void(0);"
                      >Action</a
                    >
                    <a class="dropdown-item" href="javascript:void(0);"
                      >Another action</a
                    >
                    <a class="dropdown-item" href="javascript:void(0);"
                      >Something else here</a
                    >
                    <div role="separator" class="dropdown-divider"></div>
                    <a class="dropdown-item" href="javascript:void(0);"
                      >Separated link</a
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="body">
              <h6>Input Button wtih Segmented</h6>
              <div class="input-group mb-3">
                <div
                  class="input-group-prepend"
                  v-bind:class="{ show: dropdown3 }"
                  @click="dropdown3 = !dropdown3"
                  v-click-outside="dropdown3Outside"
                >
                  <button type="button" class="btn btn-outline-secondary">
                    Action
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span class="sr-only">Toggle Dropdown</span>
                  </button>
                  <div class="dropdown-menu" v-bind:class="{ show: dropdown3 }">
                    <a class="dropdown-item" href="javascript:void(0);"
                      >Action</a
                    >
                    <a class="dropdown-item" href="javascript:void(0);"
                      >Another action</a
                    >
                    <a class="dropdown-item" href="javascript:void(0);"
                      >Something else here</a
                    >
                    <div role="separator" class="dropdown-divider"></div>
                    <a class="dropdown-item" href="javascript:void(0);"
                      >Separated link</a
                    >
                  </div>
                </div>
                <input
                  type="text"
                  class="form-control"
                  aria-label="Text input with segmented dropdown button"
                />
              </div>

              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  aria-label="Text input with segmented dropdown button"
                />
                <div
                  class="input-group-append"
                  v-bind:class="{ show: dropdown4 }"
                  @click="dropdown4 = !dropdown4"
                  v-click-outside="dropdown4Outside"
                >
                  <button type="button" class="btn btn-outline-secondary">
                    Action
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span class="sr-only">Toggle Dropdown</span>
                  </button>
                  <div
                    class="dropdown-menu dropdown-right"
                    v-bind:class="{ show: dropdown4 }"
                  >
                    <a class="dropdown-item" href="javascript:void(0);"
                      >Action</a
                    >
                    <a class="dropdown-item" href="javascript:void(0);"
                      >Another action</a
                    >
                    <a class="dropdown-item" href="javascript:void(0);"
                      >Something else here</a
                    >
                    <div role="separator" class="dropdown-divider"></div>
                    <a class="dropdown-item" href="javascript:void(0);"
                      >Separated link</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="header">
              <h2>
                Custom forms
                <small
                  >Input groups include support for custom selects and custom
                  file inputs. Browser default versions of these are not
                  supported.</small
                >
              </h2>
            </div>
            <div class="body">
              <h6>1. Custom select</h6>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text" for="inputGroupSelect01"
                    >Options</label
                  >
                </div>
                <select class="custom-select" id="inputGroupSelect01">
                  <option selected>Choose...</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>

              <div class="input-group mb-3">
                <select class="custom-select" id="inputGroupSelect02">
                  <option selected>Choose...</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                <div class="input-group-append">
                  <label class="input-group-text" for="inputGroupSelect02"
                    >Options</label
                  >
                </div>
              </div>

              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <button class="btn btn-outline-secondary" type="button">
                    Button
                  </button>
                </div>
                <select class="custom-select" id="inputGroupSelect03">
                  <option selected>Choose...</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>

              <div class="input-group">
                <select class="custom-select" id="inputGroupSelect04">
                  <option selected>Choose...</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" type="button">
                    Button
                  </button>
                </div>
              </div>
            </div>
            <div class="body">
              <h6>2. Custom file input</h6>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">Upload</span>
                </div>
                <div class="custom-file">
                  <input
                    type="file"
                    class="custom-file-input"
                    id="inputGroupFile01"
                  />
                  <label class="custom-file-label" for="inputGroupFile01"
                    >Choose file</label
                  >
                </div>
              </div>

              <div class="input-group mb-3">
                <div class="custom-file">
                  <input
                    type="file"
                    class="custom-file-input"
                    id="inputGroupFile02"
                  />
                  <label class="custom-file-label" for="inputGroupFile02"
                    >Choose file</label
                  >
                </div>
                <div class="input-group-append">
                  <span class="input-group-text" id="">Upload</span>
                </div>
              </div>

              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <button class="btn btn-outline-secondary" type="button">
                    Button
                  </button>
                </div>
                <div class="custom-file">
                  <input
                    type="file"
                    class="custom-file-input"
                    id="inputGroupFile03"
                  />
                  <label class="custom-file-label" for="inputGroupFile03"
                    >Choose file</label
                  >
                </div>
              </div>

              <div class="input-group">
                <div class="custom-file">
                  <input
                    type="file"
                    class="custom-file-input"
                    id="inputGroupFile04"
                  />
                  <label class="custom-file-label" for="inputGroupFile04"
                    >Choose file</label
                  >
                </div>
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" type="button">
                    Button
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BreadCrumb from "@/components/BreadCrumb";
export default {
  name: "BasicFormComponent",
  components: {
    BreadCrumb,
  },
  data() {
    return {
      dropdown1: false,
      dropdown2: false,
      dropdown3: false,
      dropdown4: false,
    };
  },
  methods: {
    dropdown1Outside: function () {
      this.dropdown1 = false;
    },
    dropdown2Outside: function () {
      this.dropdown2 = false;
    },
    dropdown3Outside: function () {
      this.dropdown3 = false;
    },
    dropdown4Outside: function () {
      this.dropdown4 = false;
    },
  },
  directives: {
    "click-outside": {
      bind: function (el, binding) {
        // Define Handler and cache it on the element
        const bubble = binding.modifiers.bubble;
        const handler = (e) => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e);
          }
        };
        el.__vueClickOutside__ = handler;

        // add Event Listeners
        document.addEventListener("click", handler);
      },
    },
  },
};
</script>
<style scoped></style>
