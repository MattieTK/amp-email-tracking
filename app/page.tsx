'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Home() {
	const [trackingIds, setTrackingIds] = useState(null);
	const [remoteDomain, setRemoteDomain] = useState('');

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-4xl font-bold mb-8">Email Tracking POC</h1>

			<div className="space-y-8">
				<section className="bg-white p-6 rounded-lg shadow-lg">
					<h2 className="text-2xl font-semibold mb-4">How It Works</h2>
					<p className="text-gray-700 mb-4">
						This proof of concept demonstrates an experimental method for
						tracking email read times using AMP email carousels. The system
						works by:
					</p>
					<ul className="list-disc list-inside space-y-2 text-gray-700">
						<li>Creating unique user and send IDs for each email</li>
						<li>Embedding an invisible AMP carousel with tracking pixels</li>
						<li>Recording view duration through timed pixel requests</li>
						<li>Providing analytics through the stats API</li>
					</ul>
				</section>

				<section className="bg-white p-6 rounded-lg shadow-lg">
					<h2 className="text-2xl font-semibold mb-4">API Endpoints</h2>
					<div className="space-y-4">
						<div>
							<h3 className="text-lg font-medium text-gray-900">
								POST /api/create
							</h3>
							<p className="text-gray-700">
								Creates new user and send IDs, returns AMP carousel HTML
							</p>
						</div>
						<div>
							<h3 className="text-lg font-medium text-gray-900">
								GET /api/pixel
							</h3>
							<p className="text-gray-700">
								Tracking endpoint that records view duration
							</p>
						</div>
						<div>
							<h3 className="text-lg font-medium text-gray-900">
								GET /api/stats
							</h3>
							<p className="text-gray-700">
								Retrieves viewing statistics for a specific send ID
							</p>
						</div>
					</div>
				</section>

				<section className="bg-white p-6 rounded-lg shadow-lg">
					<h2 className="text-2xl font-semibold mb-4">Test the System</h2>
					<div className="space-y-4">
						<p className="text-gray-700">
							Use the API endpoints above to test the tracking system. The
							server console will log tracking events as they occur.
						</p>
						<div className="flex space-x-4 flex-col w-1/4">
							<Input
								placeholder="Enter remote domain"
								className="mb-4"
								onChange={event => setRemoteDomain(event.target.value)}
							></Input>
							<Button
								onClick={async () => {
									const response = await fetch('/api/create', {
										method: 'POST',
										body: JSON.stringify({ remoteDomain: remoteDomain }),
									});
									const data = await response.json();
									setTrackingIds(data);
									console.log('Created new tracking IDs:', data);
								}}
							>
								Create New Tracking IDs
							</Button>
						</div>
						{trackingIds && (
							<div style={{ display: 'flex', flexDirection: 'column' }}>
								<h3 className="text-lg font-medium text-gray-900">
									Tracking IDs
								</h3>
								<pre
									style={{
										maxWidth: '800px',
										display: 'block',
										textWrap: 'wrap',
									}}
								>
									{JSON.stringify(trackingIds, null, 2)}
								</pre>
							</div>
						)}
					</div>
				</section>
			</div>
		</div>
	);
}
