import React from "react";
import styled from "styled-components";
import Layout from "../Layout/Layout";
const ContactStyles = styled.div`
  width: 1200px;
  margin: 0 auto;
`;
const Contact = () => {
  return (
    <ContactStyles>
      <Layout>
        <div className="max-w-[1200px] mx-auto mt-8">
          <span className="text-lg text-[##818ea0]">
            Our Mission, About Machic
          </span>
          <h2 className="text-[90px] font-semibold text-[#021523] w-[1045px]">
            We belive the best experience always wins
          </h2>
          <p className="content-start text-base w-[700px] my-8">
            Quisque lacinia commodo euismod. Nullam tempus nec mi id blandit. In
            lacinia nibh vitae ante laoreet rhoncus. Quisque in dapibus lorem,
            luctus gravida velit. Nulla gravida eros ac pharetra porta.
          </p>
          <img
            src="https://palap.vn/wp-content/uploads/2021/10/about-1.jpg"
            alt=""
          />
          <p className="content-end my-8 text-base">
            Nam maximus nunc a augue pulvinar, non euismod mauris tempus. Cras
            non elit vel magna molestie pellentesque in eu dui. Donec laoreet
            quis erat vitae finibus. Vestibulum enim eros, porta eget quam et,
            euismod dictum elit. Nullam eu tempus magna. Fusce malesuada nisi id
            felis placerat porta vel sed augue. Vivamus mollis mauris vitae
            rhoncus egestas. Pellentesque habitant morbi tristique senectus et
            netus et malesuada fames ac turpis egestas. Phasellus luctus tempor
            ante in dapibus. Curabitur sed lectus tempus, pulvinar magna vel,
            laoreet sapien. Pellentesque sodales ornare nulla. Nullam elementum
            est quis tortor ultricies tristique. Nulla tempor eros quis arcu
            imperdiet, rutrum pharetra mi lobortis. Donec tortor ipsum, maximus
            quis pellentesque vel, bibendum eu mauris. Nulla bibendum tincidunt
            ligula, a placerat dolor viverra eget. Maecenas id diam sed ligula
            facilisis lacinia. Nunc maximus est ut sem varius suscipit.
            Phasellus vel tellus viverra, lacinia metus et, faucibus tellus.
            Etiam hendrerit est viverra eros mollis, a laoreet ante dictum.
            Aliquam erat volutpat. Vivamus tempor blandit dui vel interdum.
            Etiam ut libero eget ex sodales lobortis vitae at est. Nulla
            facilisis velit nec pellentesque commodo. Phasellus suscipit sodales
            magna in vehicula. Ut ac semper ligula. Pellentesque laoreet justo
            nec ex sodales euismod. Aliquam orci tortor, bibendum nec ultricies
            ac, auctor nec purus. Maecenas in consectetur erat. Proin ut nisi ut
            ipsum blandit vehicula. Nulla orci eros, ornare vitae tristique et,
            iaculis nec mauris. Aliquam ornare, turpis sed lobortis ultricies,
            lectus felis lacinia lacus, et convallis ipsum erat sed tortor.
            Proin molestie sagittis augue, id sollicitudin libero congue vel.
            Suspendisse id elementum nunc. Donec in neque vitae nisl consequat
            accumsan.
          </p>
          <div className="grid grid-cols-3 gap-6">
            <div className="p-3 border-[2px] border-solid border-gray-500 rounded-lg">
              <h3 className="my-4 text-xl font-semibold">Class aptent taciti sociosqu</h3>
              <p className="text-base text-[##818ea0] mt-5">
                Quisque luctus leo sit amet ante finibus lobortis. Class aptent
                taciti sociosqu
              </p>
            </div>
            <div className="p-3 border-[2px] border-solid border-gray-500 rounded-lg">
              <h3 className="my-4 text-xl font-semibold">Class aptent taciti sociosqu</h3>
              <p className="text-base text-[##818ea0] mt-5" > 
                Quisque luctus leo sit amet ante finibus lobortis. Class aptent
                taciti sociosqu
              </p>
            </div>
            <div className="p-3 border-[2px] border-solid border-gray-500 rounded-lg">
              <h3 className="my-4 text-xl font-semibold">Class aptent taciti sociosqu</h3>
              <p className="text-base text-[##818ea0] mt-5">
                Quisque luctus leo sit amet ante finibus lobortis. Class aptent
                taciti sociosqu
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </ContactStyles>
  );
};

export default Contact;
