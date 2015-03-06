import React from 'react';
import BodyLayoutFactory from '../layouts/BodyLayout';

var BodyLayout;

class NotFoundPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    var link = this.props.referrer || '/';

    return (
      <main>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12'>
              <h1>Page Not Found.</h1>
              <h2><a href={ link }>Go back?</a></h2>
            </div>
          </div>
        </div>
      </main>
    );
  }

  static populateData (api, props, synchronous) {
    var defer = q.defer();
    defer.resolve();
    return defer.promise;
  }
}

function NotFoundPageFactory(app) {
  BodyLayout = BodyLayoutFactory(app);

  return app.mutate('core/pages/notFound', NotFoundPage);
}

export default NotFoundPageFactory;
