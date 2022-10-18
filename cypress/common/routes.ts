import {
  HttpMethod,
  RoutesDefinition as RouteDef,
} from "@axa-fr/cypress-component";

export const Routes = {
  profile: "PROFILE",
};

export const RoutesDefinition: RouteDef = {
  [Routes.profile]: {
    httpMethod: HttpMethod.GET,
    urlPattern: "/api/profile",
    defaultStub: {
      body: {
        sub: "q7NeegECCYxD4J97jzSv7BKsEtv1/YUT2gLbSnbXYfQ=",
        family_name: "PROVIS",
        gender: "unknown",
        given_name: "Pirlouit",
        name: "PROVIS Pirlouit",
        updated_at: 1665581718,
      },
    },
  },
};
