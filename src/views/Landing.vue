<template>
  <div>
    <div class="position-relative">
      <!-- shape Hero -->
      <section class="section-shaped my-0">
        <div class="shape shape-style-1 shape-default shape-skew">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="container shape-container d-flex">
          <div class="col px-0">
            <div class="row">
              <div class="col-lg-6">
                <h1 class="display-3 text-white">
                  A beautiful Design System
                  <span>completed with examples</span>
                </h1>
                <p class="lead text-white">
                  The design system comes with four pre-built pages to help you
                  get started faster. You can change the text and images and
                  you're good to go.
                </p>
                <div class="btn-wrapper">
                  <base-button
                    class="mb-3 mb-sm-0"
                    href="https://demos.creative-tim.com/argon-design-system/docs/components/alerts.html"
                    icon="fa fa-code"
                    tag="a"
                    type="info"
                  >
                    Components
                  </base-button>
                  <base-button
                    class="mb-3 mb-sm-0"
                    href="https://www.creative-tim.com/product/argon-design-system"
                    icon="ni ni-cloud-download-95"
                    tag="a"
                    type="white"
                  >
                    Download HTML
                  </base-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- 1st Hero Variation -->
    </div>
    <section class="section section-lg pt-lg-0 mt--200">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-12">
            <div class="row row-grid">
              <div class="col-lg-4">
                <card body-classes="py-5" class="border-0" hover shadow>
                  <icon
                    class="mb-4"
                    name="ni ni-check-bold"
                    rounded
                    type="primary"
                  >
                  </icon>
                  <h6 class="text-primary text-uppercase">Download Argon</h6>
                  <p class="description mt-3">
                    Argon is a great free UI package based on Bootstrap 4 that
                    includes the most important components and features.
                  </p>
                  <div>
                    <badge rounded type="primary">design</badge>
                    <badge rounded type="primary">system</badge>
                    <badge rounded type="primary">creative</badge>
                  </div>
                  <base-button class="mt-4" href="#" tag="a" type="primary">
                    Learn more
                  </base-button>
                </card>
              </div>
              <div class="col-lg-4">
                <card body-classes="py-5" class="border-0" hover shadow>
                  <icon
                    class="mb-4"
                    name="ni ni-istanbul"
                    rounded
                    type="success"
                  >
                  </icon>
                  <h6 class="text-success text-uppercase">Build Something</h6>
                  <p class="description mt-3">
                    Argon is a great free UI package based on Bootstrap 4 that
                    includes the most important components and features.
                  </p>
                  <div>
                    <badge rounded type="success">business</badge>
                    <badge rounded type="success">vision</badge>
                    <badge rounded type="success">success</badge>
                  </div>
                  <base-button class="mt-4" href="#" tag="a" type="success">
                    Learn more
                  </base-button>
                </card>
              </div>
              <div class="col-lg-4">
                <card body-classes="py-5" class="border-0" hover shadow>
                  <icon class="mb-4" name="ni ni-planet" rounded type="warning">
                  </icon>
                  <h6 class="text-warning text-uppercase">Prepare Launch</h6>
                  <p class="description mt-3">
                    Argon is a great free UI package based on Bootstrap 4 that
                    includes the most important components and features.
                  </p>
                  <div>
                    <badge rounded type="warning">marketing</badge>
                    <badge rounded type="warning">product</badge>
                    <badge rounded type="warning">launch</badge>
                  </div>
                  <base-button class="mt-4" href="#" tag="a" type="warning">
                    Learn more
                  </base-button>
                </card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section section-lg">
      <div class="container">
        <div class="row row-grid align-items-center">
          <div class="col-md-6 order-md-2">
            <img class="img-fluid floating" src="img/theme/promo-1.png" />
          </div>
          <div class="col-md-6 order-md-1">
            <div class="pr-md-5">
              <icon
                class="mb-5"
                name="ni ni-settings-gear-65"
                rounded
                shadow
                size="lg"
                type="success"
              ></icon>
              <h3>Awesome features</h3>
              <p>
                The kit comes with three pre-built pages to help you get started
                faster. You can change the text and images and you're good to
                go.
              </p>
              <ul class="list-unstyled mt-5">
                <li class="py-2">
                  <div class="d-flex align-items-center">
                    <badge
                      circle
                      class="mr-3"
                      icon="ni ni-settings-gear-65"
                      type="success"
                    ></badge>
                    <h6 class="mb-0">Carefully crafted components</h6>
                  </div>
                </li>
                <li class="py-2">
                  <div class="d-flex align-items-center">
                    <badge
                      circle
                      class="mr-3"
                      icon="ni ni-html5"
                      type="success"
                    ></badge>
                    <h6 class="mb-0">Amazing page examples</h6>
                  </div>
                </li>
                <li class="py-2">
                  <div class="d-flex align-items-center">
                    <badge
                      circle
                      class="mr-3"
                      icon="ni ni-satisfied"
                      type="success"
                    ></badge>
                    <h6 class="mb-0">Super friendly support team</h6>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section bg-secondary">
      <div class="container">
        <div class="row row-grid align-items-center">
          <div class="col-md-6">
            <div class="card bg-default shadow border-0">
              <img
                v-lazy="'img/theme/img-1-1200x1000.jpg'"
                class="card-img-top"
              />
              <blockquote class="card-blockquote">
                <svg
                  class="svg-bg"
                  preserveAspectRatio="none"
                  viewBox="0 0 583 95"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polygon
                    class="fill-default"
                    points="0,52 583,95 0,95"
                  ></polygon>
                  <polygon
                    class="fill-default"
                    opacity=".2"
                    points="0,42 583,95 683,0 0,95"
                  ></polygon>
                </svg>
                <h4 class="display-3 font-weight-bold text-white">
                  Design System
                </h4>
                <p class="lead text-italic text-white">
                  The Arctic Ocean freezes every winter and much of the sea-ice
                  then thaws every summer, and that process will continue
                  whatever happens.
                </p>
              </blockquote>
            </div>
          </div>
          <div class="col-md-6">
            <div class="pl-md-5">
              <icon
                class="mb-5"
                name="ni ni-settings"
                rounded
                shadow
                size="lg"
                type="warning"
              ></icon>

              <h3>Our customers</h3>
              <p class="lead">
                Don't let your uses guess by attaching tooltips and popoves to
                any element. Just make sure you enable them first via
                JavaScript.
              </p>
              <p>
                The kit comes with three pre-built pages to help you get started
                faster. You can change the text and images and you're good to
                go.
              </p>
              <p>
                The kit comes with three pre-built pages to help you get started
                faster. You can change the text and images and you're good to
                go.
              </p>
              <a class="font-weight-bold text-warning mt-5" href="#"
                >A beautiful UI Kit for impactful websites</a
              >
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section section section-shaped my-0 overflow-hidden">
      <div class="shape shape-style-1 bg-gradient-warning shape-skew">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="container py-0">
        <div class="row row-grid align-items-center">
          <div class="col-md-6 order-lg-2 ml-lg-auto">
            <div class="position-relative pl-md-5">
              <img class="img-center img-fluid" src="img/ill/ill-2.svg" />
            </div>
          </div>
          <div class="col-lg-6 order-lg-1">
            <div class="d-flex px-3">
              <div>
                <icon
                  class="bg-gradient-white"
                  color="primary"
                  name="ni ni-building"
                  rounded
                  shadow
                  size="lg"
                ></icon>
              </div>
              <div class="pl-4">
                <h4 class="display-3 text-white">Modern Interface</h4>
                <p class="text-white">
                  The Arctic Ocean freezes every winter and much of the sea-ice
                  then thaws every summer, and that process will continue
                  whatever happens.
                </p>
              </div>
            </div>
            <card class="shadow-lg--hover mt-5" shadow>
              <div class="d-flex px-3">
                <div>
                  <icon
                    color="white"
                    gradient="success"
                    name="ni ni-satisfied"
                    rounded
                    shadow
                  ></icon>
                </div>
                <div class="pl-4">
                  <h5 class="title text-success">Awesome Support</h5>
                  <p>
                    The Arctic Ocean freezes every winter and much of the
                    sea-ice then thaws every summer, and that process will
                    continue whatever happens.
                  </p>
                  <a class="text-success" href="#">Learn more</a>
                </div>
              </div>
            </card>
            <card class="shadow-lg--hover mt-5" shadow>
              <div class="d-flex px-3">
                <div>
                  <icon
                    color="white"
                    gradient="warning"
                    name="ni ni-active-40"
                    rounded
                    shadow
                  ></icon>
                </div>
                <div class="pl-4">
                  <h5 class="title text-warning">Modular Components</h5>
                  <p>
                    The Arctic Ocean freezes every winter and much of the
                    sea-ice then thaws every summer, and that process will
                    continue whatever happens.
                  </p>
                  <a class="text-warning" href="#">Learn more</a>
                </div>
              </div>
            </card>
          </div>
        </div>
      </div>
    </section>
    <section class="section section-lg">
      <div class="container">
        <div class="row justify-content-center text-center mb-lg">
          <div class="col-lg-8">
            <h2 class="display-3">The amazing Team</h2>
            <p class="lead text-muted">
              According to the National Oceanic and Atmospheric Administration,
              Ted, Scambos, NSIDClead scentist, puts the potentially record
              maximum.
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 col-lg-3 mb-5 mb-lg-0">
            <div class="px-4">
              <img
                v-lazy="'img/theme/team-1-800x800.jpg'"
                class="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                style="width: 200px"
              />
              <div class="pt-4 text-center">
                <h5 class="title">
                  <span class="d-block mb-1">Ryan Tompson</span>
                  <small class="h6 text-muted">Web Developer</small>
                </h5>
                <div class="mt-3">
                  <base-button
                    href="#"
                    icon="fa fa-twitter"
                    icon-only
                    rounded
                    tag="a"
                    type="warning"
                  ></base-button>
                  <base-button
                    href="#"
                    icon="fa fa-facebook"
                    icon-only
                    rounded
                    tag="a"
                    type="warning"
                  ></base-button>
                  <base-button
                    href="#"
                    icon="fa fa-dribbble"
                    icon-only
                    rounded
                    tag="a"
                    type="warning"
                  ></base-button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3 mb-5 mb-lg-0">
            <div class="px-4">
              <img
                v-lazy="'img/theme/team-2-800x800.jpg'"
                class="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                style="width: 200px"
              />
              <div class="pt-4 text-center">
                <h5 class="title">
                  <span class="d-block mb-1">Romina Hadid</span>
                  <small class="h6 text-muted">Marketing Strategist</small>
                </h5>
                <div class="mt-3">
                  <base-button
                    href="#"
                    icon="fa fa-twitter"
                    icon-only
                    rounded
                    tag="a"
                    type="primary"
                  ></base-button>
                  <base-button
                    href="#"
                    icon="fa fa-facebook"
                    icon-only
                    rounded
                    tag="a"
                    type="primary"
                  ></base-button>
                  <base-button
                    href="#"
                    icon="fa fa-dribbble"
                    icon-only
                    rounded
                    tag="a"
                    type="primary"
                  ></base-button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3 mb-5 mb-lg-0">
            <div class="px-4">
              <img
                v-lazy="'img/theme/team-3-800x800.jpg'"
                class="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                style="width: 200px"
              />
              <div class="pt-4 text-center">
                <h5 class="title">
                  <span class="d-block mb-1">Alexander Smith</span>
                  <small class="h6 text-muted">UI/UX Designer</small>
                </h5>
                <div class="mt-3">
                  <base-button
                    href="#"
                    icon="fa fa-twitter"
                    icon-only
                    rounded
                    tag="a"
                    type="info"
                  ></base-button>
                  <base-button
                    href="#"
                    icon="fa fa-facebook"
                    icon-only
                    rounded
                    tag="a"
                    type="info"
                  ></base-button>
                  <base-button
                    href="#"
                    icon="fa fa-dribbble"
                    icon-only
                    rounded
                    tag="a"
                    type="info"
                  ></base-button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3 mb-5 mb-lg-0">
            <div class="px-4">
              <img
                v-lazy="'img/theme/team-4-800x800.jpg'"
                class="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                style="width: 200px"
              />
              <div class="pt-4 text-center">
                <h5 class="title">
                  <span class="d-block mb-1">John Doe</span>
                  <small class="h6 text-muted">Founder and CEO</small>
                </h5>
                <div class="mt-3">
                  <base-button
                    href="#"
                    icon="fa fa-twitter"
                    icon-only
                    rounded
                    tag="a"
                    type="success"
                  ></base-button>
                  <base-button
                    href="#"
                    icon="fa fa-facebook"
                    icon-only
                    rounded
                    tag="a"
                    type="success"
                  ></base-button>
                  <base-button
                    href="#"
                    icon="fa fa-dribbble"
                    icon-only
                    rounded
                    tag="a"
                    type="success"
                  ></base-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section section-lg pt-0">
      <div class="container">
        <card class="border-0" gradient="warning" no-body shadow-size="lg">
          <div class="p-5">
            <div class="row align-items-center">
              <div class="col-lg-8">
                <h3 class="text-white">
                  We made website building easier for you.
                </h3>
                <p class="lead text-white mt-3">
                  I will be the leader of a company that ends up being worth
                  billions of dollars, because I got the answers. I understand
                  culture.
                </p>
              </div>
              <div class="col-lg-3 ml-lg-auto">
                <base-button
                  block
                  href="https://www.creative-tim.com/product/vue-argon-design-system"
                  size="lg"
                  tag="a"
                  type="white"
                >
                  Download Vue
                </base-button>
              </div>
            </div>
          </div>
        </card>
      </div>
    </section>
    <section class="section section-shaped my-0 overflow-hidden">
      <div class="shape shape-style-3 bg-gradient-default shape-skew">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="container pt-lg pb-300">
        <div class="row text-center justify-content-center">
          <div class="col-lg-10">
            <h2 class="display-3 text-white">Build something</h2>
            <p class="lead text-white">
              According to the National Oceanic and Atmospheric Administration,
              Ted, Scambos, NSIDClead scentist, puts the potentially record low
              maximum sea ice extent tihs year down to low ice.
            </p>
          </div>
        </div>
        <div class="row row-grid mt-5">
          <div class="col-lg-4">
            <icon
              color="primary"
              gradient="white"
              name="ni ni-settings"
              round
              shadow
              size="lg"
            ></icon>
            <h5 class="text-white mt-3">Building tools</h5>
            <p class="text-white mt-3">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
          <div class="col-lg-4">
            <icon
              color="primary"
              gradient="white"
              name="ni ni-ruler-pencil"
              round
              shadow
              size="lg"
            ></icon>
            <h5 class="text-white mt-3">Grow your market</h5>
            <p class="text-white mt-3">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
          <div class="col-lg-4">
            <icon
              color="primary"
              gradient="white"
              name="ni ni-atom"
              round
              shadow
              size="lg"
            ></icon>
            <h5 class="text-white mt-3">Launch time</h5>
            <p class="text-white mt-3">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="section section-lg pt-lg-0 section-contact-us">
      <div class="container">
        <div class="row justify-content-center mt--300">
          <div class="col-lg-8">
            <card body-classes="p-lg-5" gradient="secondary" shadow>
              <h4 class="mb-1">Want to work with us?</h4>
              <p class="mt-0">Your project is very important to us.</p>
              <base-input
                addon-left-icon="ni ni-user-run"
                alternative
                class="mt-5"
                placeholder="Your name"
              >
              </base-input>
              <base-input
                addon-left-icon="ni ni-email-83"
                alternative
                placeholder="Email address"
              >
              </base-input>
              <base-input class="mb-4">
                <textarea
                  class="form-control form-control-alternative"
                  cols="80"
                  name="name"
                  placeholder="Type a message..."
                  rows="4"
                ></textarea>
              </base-input>
              <base-button block round size="lg" type="default">
                Send Message
              </base-button>
            </card>
          </div>
        </div>
      </div>
    </section>
    <section class="section section-lg">
      <div class="container">
        <div class="row row-grid justify-content-center">
          <div class="col-lg-8 text-center">
            <h2 class="display-3">
              Do you love this awesome
              <span class="text-success">Design System for Bootstrap 4?</span>
            </h2>
            <p class="lead">
              Cause if you do, it can be yours for FREE. Hit the button below to
              navigate to Creative Tim where you can find the Design System in
              HTML. Start a new project or give an old Bootstrap project a new
              look!
            </p>
            <div class="btn-wrapper">
              <a
                class="btn btn-primary mb-3 mb-sm-0"
                href="https://www.creative-tim.com/product/vue-argon-design-system"
                >Download Vue</a
              >
            </div>
            <div class="text-center">
              <h4 class="display-4 mb-5 mt-5">
                Available on these technologies
              </h4>
              <div class="row justify-content-center">
                <div class="col-lg-2 col-4">
                  <a
                    data-original-title="Bootstrap 4 - Most popular front-end component library"
                    data-toggle="tooltip"
                    href="https://getbootstrap.com/"
                    target="_blank"
                  >
                    <img
                      v-lazy="
                        'https://s3.amazonaws.com/creativetim_bucket/tim_static_images/presentation-page/bootstrap.jpg'
                      "
                      class="img-fluid"
                    />
                  </a>
                </div>
                <div class="col-lg-2 col-4">
                  <a
                    data-original-title="[Coming Soon] Sketch - Digital design toolkit"
                    data-toggle="tooltip"
                    href="https://www.sketchapp.com/"
                    target="_blank"
                  >
                    <img
                      v-lazy="
                        'https://s3.amazonaws.com/creativetim_bucket/tim_static_images/presentation-page/sketch.jpg'
                      "
                      class="img-fluid opacity-5"
                    />
                  </a>
                </div>
                <div class="col-lg-2 col-4">
                  <a
                    data-original-title="[Coming Soon] Adobe Photoshop - Software for digital images manipulation"
                    data-toggle="tooltip"
                    href="https://www.adobe.com/products/photoshop.html"
                  >
                    <img
                      v-lazy="
                        'https://s3.amazonaws.com/creativetim_bucket/tim_static_images/presentation-page/ps.jpg'
                      "
                      class="img-fluid opacity-5"
                    />
                  </a>
                </div>
                <div class="col-lg-2 col-4">
                  <a
                    data-original-title="Vue.js - The progressive javascript framework"
                    data-toggle="tooltip"
                    href="https://vuejs.org/"
                    target="_blank"
                  >
                    <img
                      v-lazy="
                        'https://s3.amazonaws.com/creativetim_bucket/tim_static_images/presentation-page/vue.jpg'
                      "
                      class="img-fluid"
                    />
                  </a>
                </div>
                <div class="col-lg-2 col-4">
                  <a
                    data-original-title="[Coming Soon] Angular - One framework. Mobile &amp; desktop"
                    data-toggle="tooltip"
                    href="https://angularjs.org/"
                    target="_blank"
                  >
                    <img
                      v-lazy="
                        'https://s3.amazonaws.com/creativetim_bucket/tim_static_images/presentation-page/angular.jpg'
                      "
                      class="img-fluid opacity-5"
                    />
                  </a>
                </div>
                <div class="col-lg-2 col-4">
                  <a
                    data-original-title="[Coming Soon] React - A JavaScript library for building user interfaces"
                    data-toggle="tooltip"
                    href="https://reactjs.org/"
                    target="_blank"
                  >
                    <img
                      v-lazy="
                        'https://s3.amazonaws.com/creativetim_bucket/tim_static_images/presentation-page/react.jpg'
                      "
                      class="img-fluid opacity-5"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {},
};
</script>
